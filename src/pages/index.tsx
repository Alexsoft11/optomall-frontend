import React from "react";
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

const ProductsSection = dynamic(
  () => import("@/features/home/components/Products"),
);

interface HomeProps {
  slidersData: { sliders: any[] };
}

export default function Home({ slidersData }: HomeProps) {
  const t = useTranslations("Home");

  return (
    <PageLayout
      metaTitle={t("metaTitle")}
      metaDescription={t("metaDescription")}
      metaKeywords={t("metaKeywords")}
    >
      <MainSlider data={slidersData?.sliders} />
      <ProductsSection />
    </PageLayout>
  );
}


export const getStaticProps = async () => {
  try {
    const slidersResponse = await API.getHomePageSlider();

    return {
      props: {
        slidersData: slidersResponse.data || { sliders: [] },
      },
      revalidate: 86400,
    };
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        slidersData: { sliders: [] },
      },
      revalidate: 9400,
    };
  }
};