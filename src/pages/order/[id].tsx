import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import GoToBack from "@/components/GoToBack";
import { useTranslations } from "next-intl";
import PageTitle from "@/components/PageTitle";
import dynamic from "next/dynamic";

const OrderPage = dynamic(
  () => import("@/features/Order/components/OrderPage")
  // {
  //   loading: () => <Loader />,
  // }
);

export default function Order() {
  const router = useRouter();
  const t = useTranslations("GLOBAL");
  const { id } = router.query;

  return (
    <div className="container">
      <Head>
        <title>{t("order")}</title>
      </Head>
      <div>
        <GoToBack pathArr={[{ title: "order", path: "" }]} />
        <PageTitle />
        <OrderPage orderId={id as string} />
      </div>
    </div>
  );
}
