import GoToBack from "@/components/GoToBack";
import PageTitle from "@/components/PageTitle";
import { PurchasesOrderInterface } from "@/features/Purchases/interfaces";
import { API } from "@/services/api";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
import cookie from "cookie";
import { LoadingSpinner } from "@/ui/Spin";

const PurchasesPage = dynamic(
  () => import("@/features/Purchases/components/PurchasesPage"),
  {
    loading: () => <LoadingSpinner fullscreen={true} />,
  }
);

interface Props {
  purchasesData: PurchasesOrderInterface[] | [];
}

export default function Purchases({ purchasesData }: Props) {
  const t = useTranslations("GLOBAL");
  return (
    <div className="container">
      <Head>
        <title>{t("purchases")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <GoToBack pathArr={[{ title: "purchases", path: "" }]} />
        <PageTitle />
        <PurchasesPage data={purchasesData} />
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  try {
    const cookies = cookie.parse(context.req.headers.cookie || "");

    // Extract the token from the parsed cookies
    const token = decodeURIComponent(cookies.token);
    const { filter } = context.query;
    const { locale } = context;

    const purchasesResponse = await API.getPurchases(token, filter, locale);

    return {
      props: {
        purchasesData: purchasesResponse || [],
      },
    };
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        purchasesData: [],
      },
    };
  }
};
