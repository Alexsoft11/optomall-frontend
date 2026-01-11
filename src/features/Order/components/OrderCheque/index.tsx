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
  product_cost?: number;
}

export default function OrderCheque({
  cardId,
  cost,
  costPerKg,
  cardName,
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
      {contextHolder}

      {/* Main Payment Card */}
      <div className={styles.paymentCard}>
        {/* Orange Header - Title only, no amount */}
        <div className={styles.cardHeader}>
          <span className={styles.lockIcon}>🔒</span>
          <span className={styles.headerTitle}>{t("Order.payCost")}</span>
          <span className={styles.headerAmount}>{formatPrice(cost)} sum</span>
        </div>

        {/* Card Body */}
        <div className={styles.cardBody}>
          {/* Payment Instructions */}
          <p className={styles.payText}>{t("Order.payTutorialText")}</p>

          {/* Card Number Section */}
          <div className={styles.cardNumberSection}>
            <span className={styles.cardLabel}>{t("Order.cardNumber")}</span>
            <div className={styles.cardNumberBox}>
              <span className={styles.cardNumber}>{cardId}</span>
              <button className={styles.copyBtn} onClick={copyText} type="button">
                <Image
                  src={CopySvg}
                  width={20}
                  height={20}
                  alt="Copy"
                />
              </button>
            </div>
          </div>

          {/* Receiver Name */}
          {cardName && (
            <div className={styles.receiverSection}>
              <span className={styles.receiverLabel}>{t("Order.cardName")}</span>
              <span className={styles.receiverName}>{cardName}</span>
            </div>
          )}

          {/* Trust Badges */}
          <div className={styles.trustBadges}>
            <div className={styles.trustBadge}>
              <span className={styles.badgeIcon}>🔒</span>
              <span>{t("Order.safePayment")}</span>
            </div>
            <div className={styles.trustBadge}>
              <span className={styles.badgeIcon}>⚡</span>
              <span>{t("Order.fastProcessing")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* WARNING MESSAGE - Very Visible */}
      <div className={styles.warningCard}>
        <div className={styles.warningHeader}>
          <span className={styles.warningIcon}>⚠️</span>
          <span className={styles.warningTitle}>{t("Order.importantTitle")}</span>
        </div>
        <p className={styles.warningText}>
          {t("Order.impotantMessage", { costPerKg: formatPrice(costPerKg) })}
        </p>
      </div>
    </div>
  );
}
