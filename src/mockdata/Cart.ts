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
      id: 0,
      image: CartWearImg,
      title: "Lorem ipsum is dolor set amet",
      color: "black",
      size: "XL",
      cost: 1.65,
      count: 1,
    },
    {
      id: 1,
      image: CartWearImg,
      title: "Lorem ipsum is dolor set amet",
      color: "black",
      size: "XL",
      cost: 1.65,
      count: 1,
    },
    {
      id: 2,
      image: CartWearImg,
      title: "Lorem ipsum is dolor set amet",
      color: "black",
      size: "XL",
      cost: 1.65,
      count: 1,
    },
    {
      id: 3,
      image: CartWearImg,
      title: "Lorem ipsum is dolor set amet",
      color: "black",
      size: "XL",
      cost: 1.65,
      count: 1,
    },
    {
      id: 4,
      image: CartWearImg,
      title: "Lorem ipsum is dolor set amet",
      color: "black",
      size: "XL",
      cost: 1.65,
      count: 1,
    },
  ],
};

export const CartOrderMockdata: CartOrderInterface = {
  count: 1.26,
  itemsValue: 10,
};
