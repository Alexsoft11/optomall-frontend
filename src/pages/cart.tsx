import GoToBack from "@/components/GoToBack";
import PageTitle from "@/components/PageTitle";
import { CartItemInterface } from "@/features/Cart/interface";
import { API } from "@/services/api";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
import cookie from "cookie";
import { LoadingSpinner } from "@/ui/Spin";

const CartBasketPage = dynamic(
  () => import("@/features/Cart/components/CartBasketPage"),
  {
    loading: () => <LoadingSpinner className="global_page_loader" />,
  }
);

interface Props {
  basketData: CartItemInterface[] | [];
}

export default function Cart({ basketData }: Props) {
  const t = useTranslations("GLOBAL");
  return (
    <div className="container">
      <Head>
        <title>{t("cart")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <GoToBack pathArr={[{ title: "cart", path: "" }]} />
        <PageTitle />
        <CartBasketPage data={basketData} />
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  try {
    const cookies = cookie.parse(context.req.headers.cookie || "");
    // Extract the token from the parsed cookies
    const token = decodeURIComponent(cookies.token);
    const { locale } = context;

    const basketResponse: CartItemInterface[] = await API.getUserBasket(token, locale);

    return {
      props: {
        basketData: basketResponse.map(el => {
          return {...el, chacked: false}
        }) || [],
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
