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

export const groupProperties = (
  attributes: AttributesInterface[],
  configuredItems: ConfiguredItem[]
): {
  allProperties: AllDataInterface;
  imageProperties: GroupedProperties;
  ConfiguredItems: ConfiguredItem[];
} => {
  const allProperties: AllDataInterface = {};
  const imageProperties: GroupedProperties = {};
  let ConfiguredItems: ConfiguredItem[] = configuredItems;

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
      (item) => el.pid === item.pid
    );
    if (newAllData.length) {
      allProperties[newAllData[0].propertyName] = newAllData;
    }
  });

  // parsedSku.forEach((sku) => {
  //   sku.selected_quantity = 0;
  //   sku?.parsedProperties?.forEach((property) => {
  //     const { name, value, id } = property;
  //     const propId = `${id}`;
  //     const imageUrl = imagePropMap.get(propId);

  //     if (imageUrl) {
  //       if (!imageProperties[name]) {
  //         imageProperties[name] = {
  //           keys: [],
  //           propName: name,
  //         };
  //       }

  //       if (!imageProperties[name].keys.find((key) => key.value === value)) {
  //         imageProperties[name].keys.push({
  //           value,
  //           imageUrl,
  //           propId,
  //         });
  //       }
  //     }
  //     // else {
  //     //   if (!allProperties[name]) {
  //     //     allProperties[name] = {
  //     //       keys: [],
  //     //       propName: name,
  //     //     };
  //     //   }

  //     //   if (!allProperties[name].keys.find((key) => key.value === value)) {
  //     //     allProperties[name].keys.push({ value, propId });
  //     //   }
  //     // }
  //   });
  // });

  // Object.keys(allProperties).forEach((name) => {
  //   if (imageProperties[name]) {
  //     imageProperties[name]?.keys.push(
  //       ...allProperties[name].keys.filter(
  //         (key) =>
  //           !imageProperties[name].keys.some(
  //             (imgKey) => imgKey.value === key.value
  //           )
  //       )
  //     );
  //     delete allProperties[name];
  //   }
  // });

  return { allProperties, imageProperties, ConfiguredItems };
};
