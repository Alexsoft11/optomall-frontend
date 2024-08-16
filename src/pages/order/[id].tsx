import React from "react";
import Head from "next/head";
import GoToBack from "@/components/GoToBack";
import { useTranslations } from "next-intl";
import PageTitle from "@/components/PageTitle";
import dynamic from "next/dynamic";
import { API } from "@/services/api";
import { OrderDataInterface, UserDataInterface } from "@/features/Order/interfaces";
import cookie from "cookie";
import { LoadingSpinner } from "@/ui/Spin";

const OrderPage = dynamic(
  () => import("@/features/Order/components/OrderPage"),
  {
    loading: () => <LoadingSpinner fullscreen={true} size="large" />,
  }
);

interface Props {
  orderData: OrderDataInterface;
  userData: UserDataInterface
}

export default function Order({ orderData, userData }: Props) {
  const t = useTranslations("GLOBAL");

  return (
    <div className="container">
      <Head>
        <title>{t("order")}</title>
      </Head>
      <div>
        <GoToBack pathArr={[{ title: "order", path: "" }]} />
        <PageTitle />
        <OrderPage userData={userData} orderData={orderData} />
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  try {
    const cookies = cookie.parse(context.req.headers.cookie || "");
    
    const token = decodeURIComponent(cookies.token);
    const { id } = context.query;
    const { locale } = context;

    const orderResponse = await API.getOrder(token, id, locale);
    const userDataResponse = await API.getUserData(token);

    return {
      props: {
        orderData: orderResponse || [],
        userData: userDataResponse || [],
      },
    };
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        orderData: [],
        userData: [],
      },
    };
  }
};
