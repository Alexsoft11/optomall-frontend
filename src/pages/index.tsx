import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { API } from "@/services/api";
import { LoadingSpinner } from "@/ui/Spin";
import { useTranslations } from "next-intl";
import PageLayout from "@/components/Layout/PageLayout";

const MainSlider = dynamic(
  () => import("@/features/home/components/MainSlider"),
  {
    loading: () => <LoadingSpinner fullscreen={true} size="large" />,
  }
);

const Category = dynamic(() => import("@/features/home/components/Category"));

const Products = dynamic(() => import("@/features/home/components/Products"), {
  loading: () => <LoadingSpinner fullscreen={true} size="large" />,
});

interface HomeProps {
  slidersData: { sliders: any[] };
  productsData: { products: any[] };
}

export default function Home({ slidersData, productsData }: HomeProps) {
  const t = useTranslations("Home");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return <LoadingSpinner fullscreen={true} size="large" />;
  }

  return (
    <PageLayout
      metaTitle={t("metaTitle")}
      metaDescription={t("metaDescription")}
      metaKeywords={t("metaKeywords")}
    >
      <MainSlider data={slidersData?.sliders} />
      <Category />
      <Products products={productsData?.products} />
    </PageLayout>
  );
}

export const getServerSideProps = async (context: any) => {
  try {
    const slidersResponse = await API.getHomePageSlider();
    const productsResponse = await API.getHomePageProducts();

    return {
      props: {
        slidersData: slidersResponse.data || [],
        productsData: productsResponse.data || [],
        messages: (await import(`../translate/${context.locale}.json`)).default,
      },
    };
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        slidersData: [],
        productsData: [],
        messages: (await import(`../translate/${context.locale}.json`)).default,
      },
    };
  }
};
