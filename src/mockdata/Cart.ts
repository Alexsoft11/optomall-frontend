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
      title: "string",
      color: "black",
      size: "string",
      cost: 100,
      count: 1
    }
  ],
};

export const CartOrderMockdata: CartOrderInterface = {
  count: 1.26,
  itemsValue: 10,
};
