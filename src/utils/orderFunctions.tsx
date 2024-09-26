import {
  GroupedProperties,
  PropImage,
  PropsList,
  SKU,
} from "@/features/ProductDetail/interface";
import { API } from "@/services/api";

export const parseSKUProperties = (
  skus: SKU[],
  parsedTranslate: { id: string; value: any }[],
  quantityRanges?: any[]
): SKU[] => {
  return skus.map((item) => {
    const propertiesArray = item.properties_name.split(";").map((prop) => {
      const [index, subindex, propName, propValue] = prop.split(":");
      let value = propValue;
      let name = propName;
      parsedTranslate.map((el) => {
        if (el.id === `${index}:${subindex}`) {
          value = el.value.split(":")[1];
          name = el.value.split(":")[0];
        }
      });
      return {
        id: `${index}:${subindex}`,
        name: name,
        value: value,
      };
    });
    return {
      ...item,
      quantityRanges: quantityRanges,
      parsedProperties: propertiesArray,
    };
  });
};

export const groupProperties = async (
  skus: SKU[],
  propsImgs: PropImage[],
  propsList: PropsList,
  translaperProps?: PropsList,
  quantityRanges?: any[]
): Promise<{
  allProperties: GroupedProperties;
  imageProperties: GroupedProperties;
  parsedSku: SKU[];
}> => {
  const allProperties: GroupedProperties = {};
  const imageProperties: GroupedProperties = {};
  const imagePropMap = new Map(
    propsImgs.map((img) => [img.properties, img.url])
  );

  const parsedTranslate = Object.keys(translaperProps || propsList).map(
    (el, idx) => {
      return {
        id: el,
        value: Object.values(translaperProps || propsList)[idx] as string,
      };
    }
  );

  const parsedSku = parseSKUProperties(skus, parsedTranslate, quantityRanges);

  parsedSku.forEach((sku) => {
    sku.selected_quantity = 0;
    sku?.parsedProperties?.forEach((property) => {
      const { name, value, id } = property;
      const propId = `${id}`;
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

      const parsedPropsList = Object.keys(propsList).map((el, idx) => {
        return { id: el, value: Object.values(propsList)[idx] };
      });

      parsedPropsList.map((el) => {
        if (el.id === id) {
          property.originalName = el.value.split(":")[0];
          property.originalValue = el.value.split(":")[1];
        }
      });

      parsedTranslate.map((el) => {
        if (el.id === id) {
          property.name = el.value.split(":")[0];
        }
      });
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

  return { allProperties, imageProperties, parsedSku };
};
