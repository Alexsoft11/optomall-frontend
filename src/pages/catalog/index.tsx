import PageLayout from "@/components/Layout/PageLayout";
import CatalogCategory from "@/features/Catalog/components/CatalogCategory";
import { useTranslations } from "next-intl";
import React from "react";

const Catalog = () => {
  const t = useTranslations("GLOBAL");
  return (
    <>
      <PageLayout metaTitle={t("catalog")}>
        <CatalogCategory />
      </PageLayout>
    </>
  );
};

export default Catalog;
