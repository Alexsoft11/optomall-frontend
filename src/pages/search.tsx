import React from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import cookie from "cookie";
import PageLayout from "@/components/Layout/PageLayout";
import { API } from "@/services/api";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { LoadingSpinner } from "@/ui/Spin";
import GoToBack from "@/components/GoToBack";

const Search = dynamic(() => import("@/features/Search/components/Search"), {
  loading: () => <LoadingSpinner fullscreen={true} size="large" />,
});

interface SearchProps {
  productsData: any;
}

const SearchPage = ({ productsData }: SearchProps) => {
  const t = useTranslations("Search");

  return (
    <PageLayout
      metaTitle={t("metaTitle")}
      metaDescription={t("metaDescription")}
      metaKeywords={t("metaKeywords")}
    >
      <div className="container">
        <GoToBack pathArr={[{ title: "results", path: "search" }]} />
      </div>
      <Search data={productsData?.products} />
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = cookie.parse(context.req.headers.cookie || "");
    const token = decodeURIComponent(cookies.token);
    // const searchResponse = await API.getSearchPageProducts(context, token);

    return {
      props: {
        productsData: [],
      },
    };
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        productsData: [],
      },
    };
  }
};

export default SearchPage;
