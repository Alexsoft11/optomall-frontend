import React, { useState } from "react";
import styles from "./CargoCheque.module.scss";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { CopySvg } from "$/assets/images";
import { message } from "antd";

interface Props {
  cost: number;
  cardId: string;
}

export default function CargoCheque({ cardId, cost }: Props) {
  const t = useTranslations("");
  const [messageApi, contextHolder] = message.useMessage();
  const [messageVisible, setMessageVisible] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(cardId);
    if (!messageVisible) {
      setMessageVisible(true);
      messageApi.open({
        type: "success",
        content: t("Cargo.textCopyed"),
        onClose: () => setMessageVisible(false),
      });
    }
  };

  return (
    <div className={styles.main}>
      {contextHolder}
      <p className={styles.pay_text}>{t("Cargo.payTutorialText")}</p>
      <p className={styles.pay_cost}>
        {t("Cargo.payCost")}
        <span>
          <b>
            {cost} {t("GLOBAL.currency")}{" "}
          </b>
        </span>
      </p>
      <div className={styles.card_number}>
        {t("Cargo.cardNumber")}
        <div>
          <p>{cardId}</p>
          <Image
            src={CopySvg}
            width={24}
            height={24}
            alt="#"
            onClick={copyText}
          />
        </div>
      </div>
    </div>
  );
}
