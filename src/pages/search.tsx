import React from "react";
import dynamic from "next/dynamic";
import PageLayout from "@/components/Layout/PageLayout";
import { useTranslations } from "next-intl";
import { LoadingSpinner } from "@/ui/Spin";
import GoToBack from "@/components/GoToBack";

const Search = dynamic(() => import("@/features/Search/components/Search"), {
  loading: () => <LoadingSpinner fullscreen={true} size="large" />,
});



const SearchPage = () => {
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
      <Search />
    </PageLayout>
  );
};


export default SearchPage;
