// src/utils/skuUtils.ts

import {
  AllDataInterface,
  AllDataItemInterface,
  ConfiguratorInterface,
  ConfiguratorItemInterface,
  GroupedProperties,
  PropImage,
  AttributesInterface,
  ConfiguredItem,
} from "@/features/ProductDetail/interface";
import { DetailMockData } from "@/mockdata/detailData";

// export const parseSKUProperties = (skus: SKU[]): SKU[] => {
//   return skus.map((item) => {
//     const propertiesArray = item.properties_name.split(";").map((prop) => {
//       const [index, subindex, propName, propValue] = prop.split(":");
//       return {
//         id: `${index}:${subindex}`,
//         name: propName,
//         value: propValue,
//       };
//     });
//     return {
//       ...item,
//       parsedProperties: propertiesArray,
//     };
//   });
// };
const extractAndRemoveGroupedProperties = (
  data: AttributesInterface[]
): GroupedProperties => {
  const groupedProperties: GroupedProperties = {};

  for (let i = data.length - 1; i >= 0; i--) {
    // Итерируем массив с конца, чтобы удаление элементов не нарушало индексацию
    const item = data[i];

    if (item.imageUrl) {
      const propId = item.pid;

      if (!groupedProperties[propId]) {
        groupedProperties[propId] = {
          keys: [],
          propName: item.propertyName,
        };
      }

      groupedProperties[propId].keys.push({
        imageUrl: item.imageUrl,
        value: item.value,
        Vid: item.vid,
        Pid: item.pid,
      });
    }
  }

  return groupedProperties;
};

export const groupProperties = (
  attributes: AttributesInterface[],
  configuredItems: ConfiguredItem[]
): {
  allProperties: AllDataInterface;
  imageProperties: GroupedProperties;
  ConfiguredItems: ConfiguredItem[];
} => {
  const allProperties: AllDataInterface = {};
  const imageProperties: GroupedProperties =
    extractAndRemoveGroupedProperties(attributes);

  let ConfiguredItems: ConfiguredItem[] = configuredItems;

  ConfiguredItems = configuredItems.map((el) => {
    let element = Object.assign(el, {});
    let imagesProperty: ConfiguratorItemInterface[] = [];

    Object.values(imageProperties).map((images) => {
      const property = images.keys.map((image) => ({
        ...image,
        name: images.propName,
      }));
      imagesProperty = property.concat(imagesProperty);
    });

    element.configurators = el.configurators.map((config) => {
      const newConfig: ConfiguratorItemInterface =
        imagesProperty.find(
          (image) => config.Pid === image.Pid && config.Vid === image.Vid
        ) || config;

      return newConfig;
    });

    return element;
  });

  attributes.map((el) => {
    ConfiguredItems = ConfiguredItems.map((configs) => {
      const newConfig = configs.configurators.map((item) => {
        if (el.pid === item.Pid && el.vid === item.Vid) {
          return { ...item, name: el.propertyName, value: el.value };
        } else return item;
      });

      return { ...configs, configurators: newConfig, selected_quantity: 0 };
    });
  });

  attributes.map((el) => {
    const newAllData: AttributesInterface[] = attributes.filter(
      (item) => el.pid === item.pid && !el.imageUrl
    );
    if (newAllData.length) {
      allProperties[newAllData[0].propertyName] = newAllData;
    }
  });

  return { allProperties, imageProperties, ConfiguredItems };
};
