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
}

export default function OrderCheque({
  cardId,
  cost,
  costPerKg,
  cardName,
}: Props) {
  const t = useTranslations("Order");
  const [messageApi, contextHolder] = message.useMessage();
  const [messageVisible, setMessageVisible] = useState(false);
  const copyText = () => {
    navigator.clipboard.writeText(cardId);
    if (!messageVisible) {
      setMessageVisible(true);
      messageApi.open({
        type: "success",
        content: t("textCopyed"),
        onClose: () => setMessageVisible(false),
      });
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.cheque}>
        {contextHolder}
        <p className={styles.pay_text}>{t("payTutorialText")}</p>
        <p className={styles.pay_cost}>
          {t("payCost")}
          <span>
            <b> {formatPrice(cost)} sum </b>
          </span>
        </p>
        <div className={styles.card_number}>
          {t("cardNumber")}
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
            {t("cardName")}
            <div>
              <p>
                <b>{cardName}</b>
              </p>
            </div>
          </div>
        ) : null}
      </div>
      <div className={styles.important_message}>
        <h4>{t("importantTitle")}</h4>
        <p>
          <b>{t("impotantMessage", { costPerKg: formatPrice(costPerKg) })}</b>
        </p>
      </div>
    </div>
  );
}
