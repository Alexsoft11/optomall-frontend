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
}

export default function CartBasketItems({ changeQuantity, data, setAddOrder, setDataClone }: Props) {
  const t = useTranslations("Cart");
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {

    const clone = data.map(el => ({
      ...el,
      chacked: selectAll
    }));

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

      return { item: cartOrderItem, chacked: selectAll };
    }) as AddOrderInterface[];

    setAddOrder(addOrderClone);
  }, [selectAll]);

  return (
    <div className={styles.main}>
      <div className={styles.items_count}>
        <p>{t("item")} {data.length}</p>
        <Checkbox label={t("selectAll")} className={styles.chechbox} onChange={e => setSelectAll(e.target.checked)} />
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
