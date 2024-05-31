import React from "react";
import styles from "./OrderPage.module.scss";
import { OrderCheque } from "../..";
import { CartOrderBlock } from "@/Features/Cart";
import { OrderMockdata } from "@/mockdata/Order";

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
