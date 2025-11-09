import React, { Fragment } from "react";
import styles from "./CartBasketItems.module.scss";
import { useTranslations } from "next-intl";
import { Checkbox } from "@/ui";
import { LoadingSpinner } from "@/ui/Spin";
import { CartItemInterface } from "../../interface";
import CartBasketItem from "../CartBasketItem";

interface CartBasketItemsProps {
  data: CartItemInterface[];
  selected: CartItemInterface[];
  selectAll: boolean;
  setSelectAll: (checked: boolean) => void;
  changeQuantity: (number: number, item: CartItemInterface) => void;
  onToggleItem: (item: CartItemInterface, checked: boolean) => void;
  onDeleteSelected: () => void;
  isLoading: boolean;
}

export default function CartBasketItems({
  data,
  selected,
  selectAll,
  setSelectAll,
  changeQuantity,
  onToggleItem,
  onDeleteSelected,
  isLoading,
}: CartBasketItemsProps) {
  const t = useTranslations("Cart");

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
  };

  return (
    <div className={styles.main}>
      <div className={styles.items_count}>
        <div className={styles.items_count__inner}>
          <p>
            {t("item")} {data.length}
          </p>
          <span
            onClick={onDeleteSelected}
            className={selected.length ? styles.delete_btn : styles.delete_disable}
          >
            {t("deleteSelected")}
          </span>
        </div>
        <Checkbox
          label={t("selectAll")}
          checked={selectAll}
          className={styles.checkbox}
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
      </div>

      <div className={styles.swiper}>
        <LoadingSpinner spinning={isLoading} fullscreen size="large" />
        {data.map((item) => (
          <Fragment key={item.sku_id}>
            <CartBasketItem
              item={item}
              checked={!!selected.find((el) => el.sku_id === item.sku_id)}
              onToggle={(checked:any) => onToggleItem(item, checked)}
              changeQuantity={changeQuantity}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
