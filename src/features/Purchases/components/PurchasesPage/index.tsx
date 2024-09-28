import React, { Fragment, useState } from "react";
import styles from "./PurchasesPage.module.scss";
import { Button } from "antd";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import PurchasesItem from "@/components/PurchasesItem";
import { PurchasesOrderInterface } from "@/components/Types";

interface Props {
  data: PurchasesOrderInterface[] | [];
}

export default function PurchasesPage({ data = [] }: Props) {
  const t = useTranslations("Purchases");
  const router = useRouter();

  const changeRour = (filter: string) => {
    router.push(`/purchases?filter=${filter}`);
  };
  return (
    <div className={styles.main}>
      <div
        className={`${styles.switch_buttons} ${
          styles["activeChild_" + router.query.filter]
        }`}
      >
        <Button onClick={() => changeRour("active")}>{t("active")}</Button>
        <Button onClick={() => changeRour("all")}>{t("all")}</Button>
        <Button onClick={() => changeRour("in_verification")}>
          {t("inVerification")}
        </Button>
      </div>
      {data.length ? (
        <div className={styles.items_block}>
          <div className={styles.items}>
            {data?.map((el) => (
              <Fragment key={el.id}>
                <div
                  className={
                    el.unique_id === router.query.orderId
                      ? styles.selectedOrder
                      : ""
                  }
                >
                  <PurchasesItem item={el} />
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.empty_data}>
          <div>{t("emptyData")}</div>
        </div>
      )}
    </div>
  );
}
