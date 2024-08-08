import React, { Fragment } from "react";
import styles from "./CartBasketItems.module.scss";
import { useTranslations } from "next-intl";
import CartBasketItem from "../CartBasketItem";
import { AddOrderInterface, CartItemInterface } from "../../interface";
import { Checkbox } from "@/ui";
import { LoadingSpinner } from "@/ui/Spin";

interface Props {
  setAddOrder: React.Dispatch<
    React.SetStateAction<AddOrderInterface | AddOrderInterface[] | null>
  >;
  setDataClone: React.Dispatch<React.SetStateAction<CartItemInterface[]>>;
  data: CartItemInterface[];
  changeQuantity: (number: number, item: CartItemInterface) => void;
  selectAll: boolean;
  setSelectAll: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

export default function CartBasketItems({
  changeQuantity,
  data,
  setAddOrder,
  setDataClone,
  selectAll,
  setSelectAll,
  isLoading,
}: Props) {
  const t = useTranslations("Cart");
  
  const selectClick = (value: boolean) => {
    setSelectAll(value);
    const clone = data.map((el) => ({ ...el, chacked: value }));

    setDataClone(clone);

    const addOrderClone = data.map((item) => {
      if (!item) return undefined;

      const {
        product_id,
        image_url,
        title,
        color,
        size,
        sku_id,
        product_url,
        price,
        quantity,
        seller_id,
        provider
      } = item;

      const cartOrderItem = {
        product_id,
        image_url,
        title,
        color,
        product_url,
        size,
        seller_id: seller_id,
        provider: provider,
        sku_id: sku_id!,
        price: price,
        quantity,
      };

      return { item: cartOrderItem, chacked: value };
    }) as AddOrderInterface[];

    setAddOrder(addOrderClone);
  };

  return (
    <div className={styles.main}>
      <div className={styles.items_count}>
        <p>
          {t("item")} {data.length}
        </p>
        <Checkbox
          label={t("selectAll")}
          checked={selectAll}
          className={styles.chechbox}
          onChange={(e) => selectClick(e.target.checked)}
        />
      </div>
      <div className={styles.swiper}>
        <LoadingSpinner spinning={isLoading} fullscreen={true} size="large" />
        {data.map((el) => (
          <Fragment key={el.sku_id}>
            <CartBasketItem
              changeQuantity={changeQuantity}
              item={el}
              setAddOrder={setAddOrder}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
