import { CartWearImg } from "$/assets/images";
import {
  CartOrderDataInterface,
  CartOrderInterface,
} from "@/features/Cart/interface";

export const CartMockdata: CartOrderDataInterface = {
  itemsCount: 10,
  date: "14-21 апрель",
  data: [
    {
      id: 1,
      image: CartWearImg,
      title: "stringsfaswv eRGR GGFI EWGF eifhEFH ewf9h ewphfe fhew[ f8hPEFH EWFHHEWLFO HF OEHF EHEFEWIAGF  WUIGHPFIU EH",
      color: "black",
      size: "string",
      cost: 100,
      count: 1,
    },
    {
      id: 2,
      image: CartWearImg,
      title: "string",
      color: "black",
      size: "string",
      cost: 100,
      count: 1,
    },
    {
      id: 3,
      image: CartWearImg,
      title: "string",
      color: "black",
      size: "string",
      cost: 100,
      count: 1,
    },
    {
      id: 4,
      image: CartWearImg,
      title: "string",
      color: "black",
      size: "string",
      cost: 100,
      count: 1,
    },
    {
      id: 5,
      image: CartWearImg,
      title: "string",
      color: "black",
      size: "string",
      cost: 100,
      count: 1,
    },
    {
      id: 6,
      image: CartWearImg,
      title: "string",
      color: "black",
      size: "string",
      cost: 100,
      count: 1,
    },
    {
      id: 7,
      image: CartWearImg,
      title: "string",
      color: "black",
      size: "string",
      cost: 100,
      count: 1,
    },
  ],
};

export const CartOrderMockdata: CartOrderInterface = {
  count: 1.26,
  itemsValue: 10,
};
