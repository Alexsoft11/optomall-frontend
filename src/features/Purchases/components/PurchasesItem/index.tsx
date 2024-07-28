import React, { Fragment, useState } from "react";
import styles from "./PurchasesItem.module.scss";
import { PurchasesOrderInterface } from "../../interfaces";
import { useLocale, useTranslations } from "next-intl";
import SvgSelector from "$/assets/icons/SvgSelector";
import PurchasesOrderItem from "../PurchasesOrderItem";
import Image from "next/image";
import { LanguageStringIntergace } from "@/interfaces";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { message } from "antd";
import { RcFile } from "antd/es/upload";
import { Upload } from "antd/lib";
import { useRouter } from "next/router";

interface Props {
  item: PurchasesOrderInterface;
}

export default function PurchasesItem({ item }: Props) {
  const t = useTranslations("Purchases");
  const locale = useLocale();
  const router = useRouter();
  const [isUploadErr, setIsUploadErr] = useState(false);

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

  const [isRotatedUp, setIsRotatedUp] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  const handleClick = () => {
    setIsRotatedUp(!isRotatedUp);
    setFirstLoad(false);
  };

  const { appendData: createChequeData } = useQueryApiClient({
    request: {
      url: "add-check",
      method: "POST",
      disableOnMount: true,
      multipart: true,
    },
    onSuccess(res) {
      message.success("success add check", 2);
    },
  });

  const uploadProps = {
    name: "file",
    showUploadList: false,
    multiple: false,
    beforeUpload: (file: RcFile) => {
      const isImage = file.type === "image/jpeg" || file.type === "image/png";
      if (!isImage) {
        setIsUploadErr(true);
        message.error(t("imgTypeValidation"));
        return;
      }
      const isLt3M = file.size / 1024 / 1024 < 3;
      if (!isLt3M) {
        setIsUploadErr(true);
        message.error(t("imgSizeValidation"));
        return;
      }
    },
    onChange(info: any) {
      if (info.file.status === "done" && !isUploadErr) {
        const image = info.file.originFileObj;
        delete image.uid;

        const formData = new FormData();
        formData.append("image", image);
        formData.append("type", "order");
        formData.append("order_id", item.id.toString());
        createChequeData(formData);
      }
    },
  };

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
          <h3>{t("orderDate")}</h3>
          <p>{item.created_at}</p>
        </div>
        <div className={styles.detail_item}>
          <h3>{t("orderCost")}</h3>
          <p>{item.total_price} сум</p>
        </div>
        <div className={styles.detail_item}>
          <h3>{t("address")}</h3>
          <p>{item.location_name}</p>
        </div>
        <div className={styles.detail_item}>
          <h3>{t("recipient")}</h3>
          <p>{item.user_name}</p>
          <p>{item.user_phone}</p>
        </div>
        <div className={styles.detail_item}>
          <h3>{t("cargo")}</h3>
          <p>{item.kg ? item.kg + " " + t("currency") : t("calculated")}</p>
        </div>
        {/* <div className={styles.sub_status} style={{ color: item.substatus_color }}>{item.substatus[locale as keyof LanguageStringIntergace] || 'sub ststus undefiened :('}</div> */}
      </div>
      <div
        className={`${styles.more_datail} ${
          isRotatedUp ? styles.rotateUp : styles.rotateDown
        }`}
        onClick={handleClick}
      >
        <p>{t("moreDetail")}</p>
        <SvgSelector className={"breadcrumb_icon"} id={"chevron-svg"} />
      </div>
      <div className={styles.order_items}>
        {item.substatus_slug === "payment-for-delivery-is-pending" ? (
          <div className={styles.sub_status_slug}>
            <h4>{item.substatus[locale as keyof LanguageStringIntergace]}</h4>
            <button onClick={() => router.push(`cargo/${item.id}`)}>
              {t("pay")}
            </button>
          </div>
        ) : null}

        {item.substatus_slug === "payment-for-the-order-is-pending" ? (
          <div className={styles.sub_status_slug}>
            <h4>{item.substatus[locale as keyof LanguageStringIntergace]}</h4>
            <button onClick={() => router.push(`order/${item.id}`)}>
              {t("pay")}
            </button>
          </div>
        ) : null}

        {item.substatus_slug === "send_check_again" ? (
          <div className={styles.sub_status_slug}>
            <h4>{item.substatus[locale as keyof LanguageStringIntergace]}</h4>
            <Upload {...uploadProps}>
              <button>{t("upload")}</button>
            </Upload>
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
