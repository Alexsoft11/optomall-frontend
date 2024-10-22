import {
  GroupedProperties,
  PropImage,
  PropsList,
  SKU,
  TranslaedProps,
} from "@/features/ProductDetail/interface";
import { API } from "@/services/api";

export const parseSKUProperties = (
  skus: SKU[],
  parsedTranslate: { id: string; value: any }[],
  quantityRanges?: any[]
): SKU[] => {
  return skus.map((item) => {
    const propertiesArray = item.properties_name.split(";").map((prop, idx) => {
      let propLength = item.properties_name.split(";").length;
      const [propName, propValue] =
        propLength > 2 ? prop.split(":") : item.properties_name.split(";");
      const [index, subindex] = item.properties.split(";")[idx].split(":");
      let value = propValue;
      let name = propName;
      let propId = `${index}:${subindex}`;

      parsedTranslate.map((el) => {
        if (el.id === propId) value = el.value;
        else if (el.id === index) name = el.value;
      });

      return {
        id: propId,
        name: name,
        value: value,
        originalValue: propValue,
        originalName: propName,
      };
    });
    return {
      ...item,
      quantityRanges: quantityRanges,
      parsedProperties: propertiesArray,
      selected_quantity: 0,
    };
  });
};

export const groupProperties = async (
  skus: SKU[],
  propsList: PropsList[],
  translaperProps?: TranslaedProps,
  quantityRanges?: any[]
): Promise<{
  allProperties: PropsList[];
  parsedSku: SKU[];
}> => {
  const parsedTranslate = (Object.keys(translaperProps || {}) || propsList).map(
    (el, idx) => {
      return {
        id: el,
        value: (Object.values(translaperProps || {}) || propsList)[
          idx
        ] as string,
      };
    }
  );

  const allProperties: PropsList[] = propsList.map(
    ({ pid, prop_name, values }) => {
      let propName = prop_name;
      let originalValue = "";

      const updatesValues = values.map(({ imageUrl, name, vid }) => {
        let value = name;
        let propId = `${pid}:${vid}`;
        originalValue = name;
        parsedTranslate.map((el) => {
          if (el.id === propId) value = el.value;
          else if (el.id === pid) propName = el.value;
        });

        return {
          imageUrl: imageUrl,
          name: value,
          id: propId,
        };
      });

      return {
        pid: pid,
        prop_name: propName,
        values: updatesValues,
        originalName: prop_name,
        originalValue: originalValue,
      };
    }
  );

  // parsedTranslate.map(el => {
  //   parsedTranslate.forEach(item => {
  //     if (item.id.split(':')[0] === el.id.split(':')[0]) {
  //       item.value = `${el?.value?.split(':')[0]}: ${item?.value?.split(':')[1]}`
  //     }
  //   })
  // })

  const parsedSku = parseSKUProperties(skus, parsedTranslate, quantityRanges);

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
  //     } else {
  //       if (!allProperties[name]) {
  //         allProperties[name] = {
  //           keys: [],
  //           propName: name,
  //         };
  //       }

  //       if (!allProperties[name].keys.find((key) => key.value === value)) {
  //         allProperties[name].keys.push({ value, propId });
  //       }
  //     }

  //     const parsedPropsList = propsList.map((el, idx) => {
  //       return { id: el, value: Object.values(propsList)[idx] };
  //     });

  //     // parsedPropsList.map((el) => {
  //     //   if (el.id === id) {
  //     //     property.originalName = el.value.split(":")[0];
  //     //     property.originalValue = el.value.split(":")[1];
  //     //   }
  //     // });

  //     parsedTranslate.map((el) => {
  //       if (el.id === id) {
  //         property.name = el.value.split(":")[0];
  //       }
  //     });
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

  return { allProperties, parsedSku };
};
