import React from "react";
import styles from "./PurchasesOrderItem.module.scss";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { formatPrice } from "@/constants";
import { PurchasesItemInterface } from "../Types";

interface Props {
  item: PurchasesItemInterface;
}

export default function PurchasesOrderItem({ item }: Props) {
  const t = useTranslations("Purchases");

  const openPageWithProduct = () =>
    window.open(`/product/${item.product_id}?channel=${item.provider}`, "_blank", "noopener,noreferrer");

  return (
    <div className={styles.main} onClick={openPageWithProduct}>
      <div className={styles.item_img}>
        <Image height={80} width={80} alt="#" src={item.image_url} />
      </div>

      <div className={styles.item_text}>
        <div className={styles.item_info}>
          <p>{item.title}</p>
          <div className={styles.color_block}>
            <p>{item.color}</p> · <p>{item.quantity}x</p>
          </div>
        </div>

        <h3>
          {formatPrice(item.price)} {t("currency")}
        </h3>
      </div>
    </div>
  );
}
