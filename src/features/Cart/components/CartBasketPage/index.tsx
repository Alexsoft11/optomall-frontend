import React from "react";
import styles from "./CartBasketPage.module.scss";
import { CartOrderMockdata } from "@/mockdata/Cart";
import CartBasketItems from "../CartBasketItems";
import CartOrderBlock from "../CartOrderBlock";
import CartGetOrder from "../CartGetOrder";


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
