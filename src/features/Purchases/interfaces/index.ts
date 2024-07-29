import { LanguageStringIntergace } from "@/interfaces";

export interface PurchasesItemInterface {
  id: number;
  order_id: number;
  image_url: string;
  price: number;
  title: string;
}

export interface PurchasesOrderInterface {
  id: number;
  status: LanguageStringIntergace;
  status_color: string;
  total_price: number;
  user_name: string;
  user_phone: string;
  country: string;
  location_url: string;
  location_name: string;
  substatus: LanguageStringIntergace;
  substatus_slug: string;
  substatus_color: string;
  kg: string | null;
  created_at: string;
  items: PurchasesItemInterface[];
  cargo_price?: number;
}
