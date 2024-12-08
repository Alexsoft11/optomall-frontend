import PageLayout from "@/components/Layout/PageLayout";
import CatalogView from "@/features/Catalog/components/CatalogView";
import { useTranslations } from "next-intl";
import React from "react";

const Catalog = () => {
  const t = useTranslations("GLOBAL");
  return (
    <>
      <PageLayout metaTitle={t("catalog")}>
        <CatalogView />
      </PageLayout>
    </>
  );
};

export default Catalog;
