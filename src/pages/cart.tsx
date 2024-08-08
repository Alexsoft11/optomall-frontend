import GoToBack from "@/components/GoToBack";
import PageTitle from "@/components/PageTitle";
import { CartItemInterface } from "@/features/Cart/interface";
import { API } from "@/services/api";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useState } from "react";
import cookie from "cookie";
import { LoadingSpinner } from "@/ui/Spin";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useRouter } from "next/router";
import { cookieBasket } from "@/components/Auth/Functions";

const CartBasketPage = dynamic(
  () => import("@/features/Cart/components/CartBasketPage"),
  {
    loading: () => <LoadingSpinner className="global_page_loader" />,
  }
);

interface Props {
  basketData: CartItemInterface[] | [];
}

export default function Cart({}: Props) {
  const t = useTranslations("GLOBAL");
  const { locale } = useRouter();
  const [basketData, setBasketData] = useState<CartItemInterface[]>([]);

  const { isLoading } = useQueryApiClient({
    request: {
      url: `get-user-basket?lang=${locale}`,
      method: "GET",
    },
    onSuccess(res) {
      const data = res.map((el: CartItemInterface) => {
        return { ...el, chacked: false };
      });
      setBasketData(data);
    },
    onError(err){
      // if (err.message === 'Unauthenticated.' && localStorage.getItem('basket-data')) {
      //   const data : CartItemInterface[] = JSON.parse(localStorage.getItem('basket-data')!);      
      //   setBasketData(data)
      // }
    }
  });
  return (
    <div className="container">
      <Head>
        <title>{t("cart")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <GoToBack pathArr={[{ title: "cart", path: "" }]} />
        <PageTitle />
        <CartBasketPage data={basketData} isBasketDataLoading={isLoading} />
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  try {
    // const cookies = cookie.parse(context.req.headers.cookie || "");
    // Extract the token from the parsed cookies
    // const token = decodeURIComponent(cookies.token);
    // const { locale } = context;

    // const basketResponse: CartItemInterface[] = await API.getUserBasket(token, locale);
    // basketResponse.map(el => {
    //   return {...el, chacked: false}
    // }) ||
    return {
      props: {
        basketData: [],
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
