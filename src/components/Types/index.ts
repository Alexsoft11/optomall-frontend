import { ReactNode } from "react";

export interface IGoToBack {
  pathArr?: IGoToBackObject[];
  styles?: { color: string };
  backUrl?: string;
}

export interface IGoToBackObject {
  title?: string;
  path?: string;
  titleNotr?: string | ReactNode;
  target?: string;
}

export interface LocationInfoInterface {
  region: string;
  district: string;
}

import { ProppertiesInterface } from "@/features/ProductDetail/interface";
import { LanguageStringIntergace } from "@/interfaces";

export interface PurchasesItemInterface {
  id: number;
  provider: string;
  order_id: number;
  quantity: number;
  image_url: string;
  price: number;
  title: string;
  product_id?: number;
  properties: ProppertiesInterface[];
}

export interface PurchasesOrderInterface {
  id: number;
  order_id: number;
  unique_id: string;
  status: LanguageStringIntergace;
  status_color: string;
  total_price: number;
  user_name: string;
  user_phone: string;
  country: string;
  location_district: string;
  location_region: string;
  isPaid: boolean;
  substatus_color: string;
  kg: string | null;
  created_at: string;
  items: PurchasesItemInterface[];
  cargo_price?: number;
}
