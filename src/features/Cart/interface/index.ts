import { StaticImageData } from "next/image";

export interface CartItemInterface {
  id?: number;
  product_id: string;
  product_url: string;
  image_url: StaticImageData | null;
  title: string;
  color: string;
  size: string | null;
  sku_id?: number;
  color_id?: string;
  price: number;
  quantity: number;
  chacked?: boolean;
  seller_id: string;
  provider: string;
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
  color: string;
  size: string | null;
  price: number;
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
