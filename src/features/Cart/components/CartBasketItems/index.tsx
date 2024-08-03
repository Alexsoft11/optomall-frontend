import React, { Fragment, useEffect, useState } from "react";
import styles from "./CartBasketItems.module.scss";
import { useTranslations } from "next-intl";
import CartBasketItem from "../CartBasketItem";
import { AddOrderInterface, CartItemInterface, CartOrderItemInterface } from "../../interface";
import { Checkbox } from "@/ui";

interface Props {
  setAddOrder: React.Dispatch<React.SetStateAction<AddOrderInterface | AddOrderInterface[] | null>>,
  setDataClone: React.Dispatch<React.SetStateAction<CartItemInterface[]>>
  data: CartItemInterface[],
  changeQuantity: (number: number, item: CartItemInterface) => void;
  selectAll: boolean,
  setSelectAll: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CartBasketItems({ changeQuantity, data, setAddOrder, setDataClone, selectAll, setSelectAll }: Props) {
  const t = useTranslations("Cart");

  const selectClick = (value: boolean) => {

    setSelectAll(value)
    const clone = data.map(el => ({ ...el, chacked: value }));

    setDataClone(clone);

    const addOrderClone = data.map(item => {
      if (!item) return undefined;

      const { product_id, image_url, title, color, size, size_id, price, quantity } = item;
      const cartOrderItem = {
        product_id,
        image_url,
        title,
        color,
        size,
        size_id: size_id!,
        price: parseFloat(price),
        quantity
      }

      return { item: cartOrderItem, chacked: value };
    }) as AddOrderInterface[];

    setAddOrder(addOrderClone);
  }

  return (
    <div className={styles.main}>
      <div className={styles.items_count}>
        <p>{t("item")} {data.length}</p>
        <Checkbox label={t("selectAll")} checked={selectAll} className={styles.chechbox} onChange={e => selectClick(e.target.checked)} />
      </div>
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
