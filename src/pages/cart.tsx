import GoToBack from "@/components/GoToBack";
import PageTitle from "@/components/PageTitle";
import { CartItemInterface } from "@/features/Cart/interface";
import { API } from "@/services/api";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
import cookie from "cookie";
import Cookies from "universal-cookie";
import { LoadingSpinner } from "@/ui/Spin";

const CartBasketPage = dynamic(
  () => import("@/features/Cart/components/CartBasketPage"),
  {
    loading: () => <LoadingSpinner className="global_page_loader" />,
  }
);

const CartBasketNoItems = dynamic(
  () => import("@/features/Cart/components/CartBasketNoItems"),
  {
    loading: () => <LoadingSpinner className="global_page_loader" />,
  }
);

interface Props {
  basketData: CartItemInterface[] | [];
}

export default function Cart({ basketData }: Props) {
  const t = useTranslations("GLOBAL");
  const cookie = new Cookies()
  return (
    <div className="container">
      <Head>
        <title>{t("cart")}</title>
      </Head>
      <div>
        <GoToBack pathArr={[{ title: "cart", path: "" }]} />
        <PageTitle />
        {basketData.length ? <CartBasketPage data={basketData} /> : null}
        {!basketData.length && !cookie.get('token') ? <CartBasketPage data={basketData} /> : null}
        {!basketData.length && cookie.get('token') ? <CartBasketNoItems /> : null}
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  try {
    const cookies = cookie.parse(context.req.headers.cookie || "");

    // Extract the token from the parsed cookies
    const token = decodeURIComponent(cookies.token);
    const basketResponse: CartItemInterface[] = await API.getUserBasket(token);

    return {
      props: {
        basketData: basketResponse || [],
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
