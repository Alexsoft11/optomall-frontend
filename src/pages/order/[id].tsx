import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import GoToBack from "@/components/GoToBack";
import { useTranslations } from "next-intl";
import PageTitle from "@/components/PageTitle";
import dynamic from "next/dynamic";
import { API } from "@/services/api";
import { OrderDataInterface } from "@/features/Order/interfaces";

const OrderPage = dynamic(
  () => import("@/features/Order/components/OrderPage")
  // {
  //   loading: () => <Loader />,
  // }
);

interface Props {
  orderData: OrderDataInterface;
}

export default function Order({ orderData }: Props) {
  const router = useRouter();
  const t = useTranslations("GLOBAL");

  return (
    <div className="container">
      <Head>
        <title>{t("order")}</title>
      </Head>
      <div>
        <GoToBack pathArr={[{ title: "order", path: "" }]} />
        <PageTitle />
        <OrderPage orderData={orderData} />
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  try {
    const token = decodeURIComponent(
      context.req.headers.cookie.match(/ token=([^;]+)/)[1]
    );
    const { id } = context.query;

    const orderResponse = await API.getOrder(token, id);

    return {
      props: {
        orderData: orderResponse.order || [],
      },
    };
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        basketData: [],
      },
    };
  }
};
