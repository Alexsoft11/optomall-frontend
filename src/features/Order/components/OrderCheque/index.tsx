import React, { useState } from "react";
import styles from "./OrderCheque.module.scss";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { CopySvg } from "$/assets/images";
import { message } from "antd";
import { formatPrice } from "@/constants";

interface Props {
  cost: number;
  cardId: string;
  costPerKg: string;
  cardName?: string;
  delivery_china?: number;
}

export default function OrderCheque({
  cardId,
  cost,
  costPerKg,
  cardName,
  delivery_china,
}: Props) {
  const t = useTranslations("");
  const [messageApi, contextHolder] = message.useMessage();
  const [messageVisible, setMessageVisible] = useState(false);
  const copyText = () => {
    navigator.clipboard.writeText(cardId);
    if (!messageVisible) {
      setMessageVisible(true);
      messageApi.open({
        type: "success",
        content: t("Order.textCopyed"),
        onClose: () => setMessageVisible(false),
      });
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.cheque}>
        {contextHolder}
        <p className={styles.pay_text}>{t("Order.payTutorialText")}</p>
        <p className={styles.pay_cost}>
          {t("Order.payCost")}
          <span>
            <b> {formatPrice(cost)} sum </b>
          </span>
        </p>
        <p className={styles.pay_china}>
          {t("Cart.delivery_china")}
          <span>
            <b> {formatPrice(delivery_china)} sum </b>
          </span>
        </p>
        <div className={styles.card_number}>
          {t("Order.cardNumber")}
          <div>
            <p>
              <b>{cardId}</b>
            </p>
            <Image
              src={CopySvg}
              width={24}
              height={24}
              alt="#"
              onClick={copyText}
            />
          </div>
        </div>
        {cardName ? (
          <div className={styles.card_number}>
            {t("Order.cardName")}
            <div>
              <p>
                <b>{cardName}</b>
              </p>
            </div>
          </div>
        ) : null}
      </div>
      <div className={styles.important_message}>
        <h4>{t("Order.importantTitle")}</h4>
        <p>
          <b>
            {t("Order.impotantMessage", { costPerKg: formatPrice(costPerKg) })}
          </b>
        </p>
      </div>
    </div>
  );
}
