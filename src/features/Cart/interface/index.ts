import { StaticImageData } from "next/image";

export interface CartItemInterface {
  id: number,
  product_id: string;
  image_url: StaticImageData | null;
  title: string;
  color: string;
  size: string | null;
  size_id: number;
  price: string;
  quantity: number;
}

export interface CartOrderItemInterface {
  product_id: string;
  image_url: StaticImageData | null;
  title: string;
  color: string;
  size: string | null;
  price: number;
  quantity: number;
}

export interface CreateOrderDataInterface {
  total_price: number;
  location: {
    name: string | null;
    url: string | null;
  };
  userData: PersonalDataInterface | null;
  items: CartOrderItemInterface[];
}


export interface PersonalDataInterface {
    name: string,
    phone: string
}

export interface CartOrderDataInterface {
  itemsCount: number;
  date: string;
  data: CartOrderItemInterface[];
}

export interface CartOrderInterface {
  count: number;
  itemsValue: number;
}
