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
      url: `orders/${item.order_id}/delivery‑fees`,
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
    // Remove the hash at the start if it's there
    hex = hex ? hex.replace("#", "") : "";

    if (hex?.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("");
    }

    // Parse the r, g, b values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Return the rgba string
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const [isRotatedUp, setIsRotatedUp] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);

  const handleClick = () => {
    setIsRotatedUp(!isRotatedUp);
    setFirstLoad(false);
  };

  const toOrder = () => push(`/order/${item.id}`);

  return (
    <div
      className={`${styles.main} ${
        isRotatedUp
          ? styles.detailOpen
          : firstLoad
          ? styles.firsLoadAnimation
          : styles.detailClose
      }`}
    >
      <div className={styles.order_info}>
        <p>
          {t("goods")}: {item.items.length}
        </p>
        <div className={styles.order_status}>
          <div className={styles.flag_img}>
            <Image src={item.country} alt="flag" fill />
          </div>
          <div
            className={styles.order_status__status}
            style={{
              color: item.status_color,
              backgroundColor: hexToRgba(item.status_color, 0.1),
            }}
          >
            {item.status[locale as keyof LanguageStringIntergace]}
          </div>
        </div>
      </div>
      <div className={styles.order_detail}>
        <div className={styles.detail_item}>
          <h3>{t("orderId")}</h3>
          <p>{item.unique_id}</p>
        </div>
        <div className={styles.detail_item}>
          <h3>{t("orderDate")}</h3>
          <p>{item?.created_at.match(getCreateDateRegexp)![0]}</p>
        </div>
        <div className={styles.detail_item}>
          <h3>{t("orderCost")}</h3>
          <p>{formatPrice(item.total_price)} сум</p>
        </div>
        {item.location_region !== "." && item.location_district !== "." ? (
          <div className={styles.detail_item}>
            <h3>{t("address")}</h3>
            <p>
              {item.location_region}, {item.location_district}
            </p>
          </div>
        ) : null}
        {item.user_name !== "." && item.user_phone !== "." ? (
          <div className={styles.detail_item}>
            <h3>{t("recipient")}</h3>
            <div>
              <p>{item.user_name}, </p>
              <p>{item.user_phone}</p>
            </div>
          </div>
        ) : null}
        <div className={styles.detail_item}>
          <h3>{t("cargo")}</h3>
          <p>
            {item.cargo_price
              ? formatPrice(item.cargo_price) + " " + t("currency")
              : t("calculated")}
          </p>
        </div>
      </div>
      {/* <div
        className={`${styles.more_datail} ${
          isRotatedUp ? styles.rotateUp : styles.rotateDown
        }`}
        onClick={handleClick}
      >
        <p>{t("moreDetail")}</p>
        <SvgSelector className={"breadcrumb_icon"} id={"chevron-svg"} />
      </div> */}
      <div className={styles.order_items}>
        {!item.isPaid && !asPath.includes("order") ? (
          <div onClick={toOrder} className={styles.sub_status_slug}>
            <h4>{t("send_check_again")}</h4>
            <button>{t("upload")}</button>
          </div>
        ) : null}

        {item.items.map((el) => (
          <Fragment key={el.id}>
            <PurchasesOrderItem item={el} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
