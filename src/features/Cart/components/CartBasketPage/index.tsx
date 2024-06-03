import React from "react";
import styles from "./CartBasketPage.module.scss";
import { CartBasketItems, CartGetOrder, CartOrderBlock } from "@/features/Cart";
import { CartOrderMockdata } from "@/mockdata/Cart";

export default function CartBasketPage() {
  return (
    <div className={styles.main}>
      <CartBasketItems />
      <div className={styles.order_side}>
        <CartOrderBlock cost={CartOrderMockdata.count} />
        <CartGetOrder />
      </div>
    </div>
  );
}
