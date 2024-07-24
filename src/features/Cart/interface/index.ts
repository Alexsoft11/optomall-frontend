import { LocationInfoInterface } from "@/components/Types";
import { LanguageStringIntergace } from "@/interfaces";
import { StaticImageData } from "next/image";

export interface CartItemInterface {
  id?: number;
  product_id: string;
  image_url: StaticImageData | null;
  title: LanguageStringIntergace;
  color: string;
  size: string | null;
  size_id?: number;
  color_id?: string;
  price: string;
  quantity: number;
}

export interface CartOrderItemInterface {
  product_id: string;
  image_url: StaticImageData | null;
  title: string;
  size_id: number;
  color: string;
  size: string | null;
  price: number;
  quantity: number;
}

export interface CreateOrderDataInterface {
  total_price: number;
  location: LocationInfoInterface,
  userData: PersonalDataInterface | null;
  items: CartOrderItemInterface[];
}

export interface PersonalDataInterface {
  name: string;
  phone: string;
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
