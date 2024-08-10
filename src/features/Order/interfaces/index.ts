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

export interface EditOrderInterface {
  order_id: number
  region: string;
  district: string;
  name: string,
  phone: string,
}
