export interface IGoToBack {
  pathArr?: IGoToBackObject[];
  styles?: { color: string };
  backUrl?: string;
}

export interface IGoToBackObject {
  title?: string;
  path?: string;
  titleNotr?: string;
}

export interface LocationInfoInterface {
  region: string;
  district: string;
}

import { LanguageStringIntergace } from "@/interfaces";

export interface PurchasesItemInterface {
  id: number;
  provider: string;
  order_id: number;
  color: string;
  quantity: number;
  image_url: string;
  price: number;
  title: string;
  product_id?: number;
}

export interface PurchasesOrderInterface {
  id: number;
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
