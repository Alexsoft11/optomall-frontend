import { LocationInfoInterface } from "@/components/Types";
import { PersonalDataInterface } from "@/features/Order/interfaces";
import { ProppertiesInterface } from "@/features/ProductDetail/interface";
import { StaticImageData } from "next/image";

export interface CartItemInterface {
  id: number;
  title: string;
  product_id: string;
  image_url: StaticImageData | null;
  price: number;
  quantity: number;
  sku_id: number;
  provider: string;
  product_url: string;
  seller_id: string;
  properties: ProppertiesInterface[]
  chacked?: boolean;
  user_info: LocationInfoInterface
  user_location: PersonalDataInterface
}

export interface AddOrderInterface {
  item: CartOrderItemInterface;
  chacked: boolean;
}

export interface CartOrderItemInterface {
  product_id: string;
  image_url: StaticImageData | null;
  title: string;
  provider: string;
  product_url: string;
  sku_id: number;
  price: number;
  properties: ProppertiesInterface[]
  quantity: number;
}

export interface CreateOrderDataInterface {
  total_price: number;
  items: CartOrderItemInterface[];
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
