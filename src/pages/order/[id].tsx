import React from "react";
import { OrderPage } from "@/features/Order";
import { useRouter } from "next/router";
import Head from "next/head";
import GoToBack from "@/components/GoToBack";
import { useTranslations } from "next-intl";

export default function Order() {
  const router = useRouter();
  const t = useTranslations("GLOBAL");
  const { id } = router.query;

  return (
    <div className="container">
      <Head>
        <title>{t("basket")}</title>
      </Head>
      <div
        style={{
          color: "black",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          justifyContent: "start",
          margin: "10px 0px 0px 0px",
        }}
      >
        <GoToBack pathArr={[{ title: "order", path: "" }]} />
        <h1>{t("basket")}</h1>
        <OrderPage orderId={id as string} />
      </div>
    </div>
  );
}
