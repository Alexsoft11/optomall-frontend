import React from "react";
import styles from "./OrderPage.module.scss";
import OrderCheque from "../OrderCheque";
import { CartOrderBlock } from "@/features/Cart";
import { OrderDataInterface } from "../../interfaces";

interface Props {
  orderData: OrderDataInterface;
}

export default function OrderPage({ orderData }: Props) {
  
  return (
    <div className={styles.main}>
      <OrderCheque costPerKg={orderData.kg_price} cardId={orderData.card_number} cost={orderData.total_price} />
      <CartOrderBlock orderId={orderData.id} type="order" cost={`${orderData.total_price} uzs`} />
    </div>
  );
}
