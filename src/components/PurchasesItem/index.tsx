import React, { Fragment, useEffect, useState } from "react";
import styles from "./PurchasesItem.module.scss";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { LanguageStringIntergace } from "@/interfaces";
import { useRouter } from "next/router";
import { formatPrice } from "@/constants";
import { PurchasesOrderInterface } from "../Types";
import PurchasesOrderItem from "../PurchasesOrderItem";
import useQueryApiClient from "@/utils/useQueryApiClient";

interface Props {
  item: PurchasesOrderInterface;
  isOrderPage?: boolean;
  onDeliveryFeeFinished?: (total?: number) => void;
}

export default function PurchasesItem({
  item,
  isOrderPage,
  onDeliveryFeeFinished,
}: Props) {
  const t = useTranslations("Purchases");
  const locale = useLocale();
  const { push, asPath } = useRouter();
  const getCreateDateRegexp = /(\d){4}-(\d){2}-(\d){2}/;

  const { appendData: createData } = useQueryApiClient({
    request: {
      url: `orders/${item.order_id}/delivery‑fees/tmapi`,
      method: "GET",
      disableOnMount: true,
    },
    onSuccess(res) {
      onDeliveryFeeFinished?.(res?.groupTotal || 0);
    },
    onError(response) {
      onDeliveryFeeFinished?.(0);
    },
  });

  useEffect(() => {
    if (isOrderPage && item.items[0].provider === "1688") {
      createData();
    }
  }, [isOrderPage]);

  function hexToRgba(hex?: string, alpha: number = 1): string {
    hex = hex ? hex.replace("#", "") : "";
    if (hex?.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("");
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const [isRotatedUp, setIsRotatedUp] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);

  const handleClick = () => {
    setIsRotatedUp(!isRotatedUp);
    setFirstLoad(false);
  };

  const toOrder = () => push(`/order/${item.id}`);

  // Helper for status badge style
  const statusStyle = {
    color: item.status_color,
    backgroundColor: hexToRgba(item.status_color, 0.1),
    borderColor: hexToRgba(item.status_color, 0.2),
  };

  const formattedDate = item?.created_at.match(getCreateDateRegexp)?.[0] || item.created_at;

  return (
    <div className={styles.card}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.idLabel}>{t("orderId")}:</span>
          <span className={styles.idValue}>{item.unique_id}</span>
        </div>
        <div className={styles.headerRight}>
           <div className={styles.flagWrapper}>
              <Image src={item.country} alt="country" fill className={styles.flagImage} />
           </div>
           <div className={styles.statusBadge} style={statusStyle}>
             {item.status[locale as keyof LanguageStringIntergace]}
           </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className={styles.detailsGrid}>
        <div className={styles.detailItem}>
          <span className={styles.label}>{t("orderDate")}</span>
          <span className={styles.value}>{formattedDate}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>{t("orderCost")}</span>
          <span className={styles.valueHighlight}>{formatPrice(item.total_price)} сум</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>{t("cargo")}</span>
          <span className={styles.value}>{item.cargo_price ? formatPrice(item.cargo_price) + " " + t("currency") : t("calculated")}</span>
        </div>
         <div className={styles.detailItem}>
          <span className={styles.label}>{t("goods")}</span>
          <span className={styles.value}>{item.items.length}</span>
        </div>

        {item.location_region !== "." && item.location_district !== "." && (
          <div className={`${styles.detailItem} ${styles.fullWidth}`}>
            <span className={styles.label}>{t("address")}</span>
            <span className={styles.value}>{item.location_region}, {item.location_district}</span>
          </div>
        )}

        {/* Recipient could be useful if distinguishable */}
        {item.user_name !== "." && item.user_phone !== "." && (
           <div className={`${styles.detailItem} ${styles.fullWidth}`}>
            <span className={styles.label}>{t("recipient")}</span>
            <span className={styles.value}>{item.user_name}, {item.user_phone}</span>
          </div>
        )}
      </div>
      
      {/* Divider */}
      <div className={styles.divider} />

      {/* Items List */}
      <div className={`${styles.itemsContainer} ${!isRotatedUp ? styles.collapsed : ''}`}>
         {!item.isPaid && !asPath.includes("order") && (
          <div className={styles.actionRow}>
             <div onClick={toOrder} className={styles.checkAgainAction}>
                <span>{t("send_check_again")}</span>
                <button>{t("upload")}</button>
            </div>
          </div>
        )}

        <div className={styles.itemsList}>
          {item.items.map((el) => (
            <Fragment key={el.id}>
              <PurchasesOrderItem item={el} />
            </Fragment>
          ))}
        </div>
      </div>

      {/* <div className={styles.toggleRow} onClick={handleClick}>
         <span>{isRotatedUp ? t("hideDetails") : t("moreDetail")}</span> 
       
         <div className={`${styles.chevron} ${isRotatedUp ? styles.up : styles.down}`}></div>
      </div> */}
    </div>
  );
}
