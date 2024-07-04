import GoToBack from "@/components/GoToBack";
import PageTitle from "@/components/PageTitle";
import { CartOrderItemInterface } from "@/features/Cart/interface";
import { API } from "@/services/api";
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

interface Props {
  basketData: CartOrderItemInterface[] | []
}

export default function Cart({ basketData }: Props) {
  const t = useTranslations("GLOBAL");
  return (
    <div className="container">
      <Head>
        <title>{t("cart")}</title>
      </Head>
      <div>
        <GoToBack pathArr={[{ title: "cart", path: "" }]} />
        <PageTitle />
        {basketData.length ? <CartBasketPage data={basketData} /> : <CartBasketNoItems />}
      </div>
    </div>
  );
}



export const getServerSideProps = async (context: any) => {
  try {
    const basketResponse = await API.getUserBasket();
    
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
