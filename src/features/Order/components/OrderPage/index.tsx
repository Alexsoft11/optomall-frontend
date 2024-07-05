import React from "react";
import styles from "./OrderPage.module.scss";
import { OrderMockdata } from "@/mockdata/Order";
import OrderCheque from "../OrderCheque";
import { CartOrderBlock } from "@/features/Cart";
import { OrderDataInterface } from "../../interfaces";

interface Props {
  orderData: OrderDataInterface;
}

export default function OrderPage({ orderData }: Props) {
  return (
    <div className={styles.main}>
      <OrderCheque cardId={orderData?.card_number} cost={orderData?.total_price} />
      <CartOrderBlock orderId={orderData?.id} cost={orderData?.total_price} />
    </div>
  );
}
