import React, { Fragment } from "react";
import styles from "./PurchasesOrderItem.module.scss";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { formatPrice } from "@/constants";
import { PurchasesItemInterface } from "../Types";
import CustomImage from "../CustomImage";

interface Props {
  item: PurchasesItemInterface;
}

export default function PurchasesOrderItem({ item }: Props) {
  const t = useTranslations("Purchases");
  const openPageWithProduct = () =>
    window.open(
      `/product/${item.product_id}?provider=${item.provider}`,
      "_blank",
      "noopener,noreferrer"
    );

  return (
    <div className={styles.container} onClick={openPageWithProduct}>
      <div className={styles.imageWrapper}>
        <CustomImage height={80} width={80} alt={item.title} src={item.image_url} />
      </div>

      <div className={styles.infoColumn}>
        <div className={styles.headerRow}>
          <h4 className={styles.title}>{item.title}</h4>
          <div className={styles.priceBlock}>
            <span className={styles.price}>
              {formatPrice(item.price)} <small>{t("currency")}</small>
            </span>
            <span className={styles.quantity}>x{item.quantity}</span>
          </div>
        </div>

        <div className={styles.properties}>
          {item.properties.map((el) => (
            <div key={el.id} className={styles.propertyItem}>
              <span className={styles.propName}>{el.name}:</span>
              <span className={styles.propValue}>{el.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
