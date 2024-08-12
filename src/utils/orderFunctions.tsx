// src/utils/skuUtils.ts

import {
  GroupedProperties,
  PropImage,
  SKU,
} from "@/features/ProductDetail/interface";

export const parseSKUProperties = (skus: SKU[]): SKU[] => {
  return skus.map((item) => {
    const propertiesArray = item.properties_name.split(";").map((prop) => {
      const [index, subindex, propName, propValue] = prop.split(":");
      return {
        index,
        subindex,
        id: `${index}:${subindex}`,
        name: propName,
        value: propValue,
      };
    });
    return {
      ...item,
      parsedProperties: propertiesArray,
    };
  });
};

export const groupProperties = (
  skus: SKU[],
  propsImgs: PropImage[]
): {
  allProperties: GroupedProperties;
  imageProperties: GroupedProperties;
} => {
  const allProperties: GroupedProperties = {};
  const imageProperties: GroupedProperties = {};
  const skuData = parseSKUProperties(skus);
  const imagePropMap = new Map(
    propsImgs.map((img) => [img.properties, img.url])
  );

  skuData.forEach((sku) => {
    sku?.parsedProperties?.forEach((property) => {
      const { name, value, index, subindex } = property;
      const propId = `${index}:${subindex}`;
      const imageUrl = imagePropMap.get(propId);

      if (imageUrl) {
        if (!imageProperties[name]) {
          imageProperties[name] = {
            keys: [],
            propName: name,
          };
        }

        if (!imageProperties[name].keys.find((key) => key.value === value)) {
          imageProperties[name].keys.push({
            value,
            imageUrl,
            propId,
          });
        }
      } else {
        if (!allProperties[name]) {
          allProperties[name] = {
            keys: [],
            propName: name,
          };
        }

        if (!allProperties[name].keys.find((key) => key.value === value)) {
          allProperties[name].keys.push({ value, propId });
        }
      }
    });
  });

  Object.keys(allProperties).forEach((name) => {
    if (imageProperties[name]) {
      imageProperties[name]?.keys.push(
        ...allProperties[name].keys.filter(
          (key) =>
            !imageProperties[name].keys.some(
              (imgKey) => imgKey.value === key.value
            )
        )
      );
      delete allProperties[name];
    }
  });

  return { allProperties, imageProperties };
};
