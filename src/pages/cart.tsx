import GoToBack from "@/components/GoToBack";
import PageTitle from "@/components/PageTitle";
import { CartMockdata } from "@/mockdata/Cart";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const CartBasketPage = dynamic(
  () => import("@/features/Cart/components/CartBasketPage")
  // {
  //   loading: () => <Loader />,
  // }
);

const CartBasketNoItems = dynamic(
  () => import("@/features/Cart/components/CartBasketNoItems")
  // {
  //   loading: () => <Loader />,
  // }
);

export default function Cart() {
  const t = useTranslations("GLOBAL");
  return (
    <div className="container">
      <Head>
        <title>{t("cart")} {" "}</title>
      </Head>
      <div>
        <GoToBack pathArr={[{ title: "cart", path: "" }]} />
        <PageTitle />
        {CartMockdata.data.length ? <CartBasketPage /> : <CartBasketNoItems />}
      </div>
    </div>
  );
}
