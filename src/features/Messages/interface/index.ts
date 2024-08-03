import { LanguageStringIntergace } from "@/interfaces";

export interface MessagesDataInterface {
  id: number;
  user_id: number;
  message: LanguageStringIntergace;
  order_id: string;
}
