import { PurchasesOrderInterface } from "@/components/Types";

export interface OrderDataInterface {
  order: {
    total_price: number;
    kg_price: string;
    card_number: string;
    id: number;
  };
  detail: PurchasesOrderInterface[]
}
