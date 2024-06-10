import React from "react";
import styles from "./OrderPage.module.scss";
import { OrderMockdata } from "@/mockdata/Order";
import OrderCheque from "../OrderCheque";
import { CartOrderBlock } from "@/features/Cart";

interface Props {
  orderId: string;
}

export default function OrderPage({ orderId }: Props) {
  return (
    <div className={styles.main}>
      <OrderCheque cardId={OrderMockdata.cardId} cost={OrderMockdata.cost} />
      <CartOrderBlock orderId={orderId} cost={OrderMockdata.cost} />
    </div>
  );
}
