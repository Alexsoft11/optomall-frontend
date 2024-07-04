import React, { Fragment, useState } from "react";
import styles from "./CartBasketItems.module.scss";
import { useTranslations } from "next-intl";
import CartBasketItem from "../CartBasketItem";
import { CartOrderDataInterface, CartOrderItemInterface } from "../../interface";

interface Props {
  setAddOrder: React.Dispatch<React.SetStateAction<CartOrderItemInterface | null>>,
  data: CartOrderItemInterface[]
}


export default function CartBasketItems({data, setAddOrder}: Props) {
  const t = useTranslations("Cart");

  return (
    <div className={styles.main}>
      <p className={styles.items_count}>
        {t("item")} {data.length}
      </p>
      <div className={styles.swiper}>
        {data.map((el) => (
          <Fragment key={el.id}>
            <CartBasketItem item={el} setAddOrder={setAddOrder} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
