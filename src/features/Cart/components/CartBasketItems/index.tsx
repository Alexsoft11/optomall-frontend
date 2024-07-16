import React, { Fragment, useState } from "react";
import styles from "./CartBasketItems.module.scss";
import { useTranslations } from "next-intl";
import CartBasketItem from "../CartBasketItem";
import { CartItemInterface, CartOrderItemInterface } from "../../interface";

interface Props {
  setAddOrder: React.Dispatch<React.SetStateAction<{ item: CartOrderItemInterface, chacked: boolean } | null>>,
  data: CartItemInterface[],
  changeQuantity: (number: number, item: CartItemInterface) => void
}


export default function CartBasketItems({changeQuantity, data, setAddOrder }: Props) {
  const t = useTranslations("Cart");

  return (
    <div className={styles.main}>
      <p className={styles.items_count}>
        {t("item")} {data.length}
      </p>
      <div className={styles.swiper}>
        {data.map((el) => (
          <Fragment key={el.size_id}>
            <CartBasketItem changeQuantity={changeQuantity} item={el} setAddOrder={setAddOrder} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
