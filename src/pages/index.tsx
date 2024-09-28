import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { API } from "@/services/api";
import { LoadingSpinner } from "@/ui/Spin";
import { useTranslations } from "next-intl";
import PageLayout from "@/components/Layout/PageLayout";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useRouter } from "next/router";
import useSearchStore from "@/store/useSearchStore";

const MainSlider = dynamic(
  () => import("@/features/home/components/MainSlider"),
  {
    loading: () => <LoadingSpinner fullscreen={true} size="large" />,
  }
);

const ProductsSection = dynamic(
  () => import("@/features/home/components/Products"),
);

interface HomeProps {
  slidersData: { sliders: any[] };
}

export default function Home({ slidersData }: HomeProps) {
  const t = useTranslations("Home");
  const {
    products,
    setProducts,
    isBack,
    setIsBack
  } = useSearchStore();
  const router = useRouter();


  const { appendData: getProductsData, isLoading: isProductsLoading } =
    useQueryApiClient({
      request: {
        url: `products?lang=${router.locale}`,
        method: "GET",
        disableOnMount: true
      },
      onSuccess(res: any) {
        setProducts(res.products);
      },
    });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!isBack) {
        getProductsData({ query: "discount" });
      } else {
        setIsBack(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  // if (isLoading) {
  //   return <LoadingSpinner fullscreen={true} size="large" />;
  // }

  return (
    <PageLayout
      metaTitle={t("metaTitle")}
      metaDescription={t("metaDescription")}
      metaKeywords={t("metaKeywords")}
    >
      <MainSlider data={slidersData?.sliders} />
      <ProductsSection
        productsData={products}
        getProductsData={getProductsData}
        isProductsLoading={isProductsLoading}
      />
    </PageLayout>
  );
}


export const getServerSideProps = async (context: any) => {
  try {

    const slidersResponse = await API.getHomePageSlider();
    return {
      props: {
        slidersData: slidersResponse.data || { sliders: [] },
      },
    };
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        slidersData: { sliders: [] },
      },
    };
  }
};
