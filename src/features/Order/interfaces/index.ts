import { PurchasesOrderInterface } from "@/components/Types";

export interface OrderDataInterface {
  order: {
    total_price: number;
    kg_price: string;
    card_number: string;
    name?: string;
    id: number;
  };
  detail: PurchasesOrderInterface[];
}

export interface UserDataInterface {
  name: string | null;
  unique_id: number;
  email: string | null;
  last_name: string | null;
  adress: string | null;
  phone: string | null;
  region: string | null;
  district: string | null;
}

export interface PersonalDataInterface {
  name: string;
  phone: string;
}

export interface EditOrderInterface {
  order_id: number;
  region: string;
  district: string;
  name: string;
  phone: string;
}
