import React from "react";
import GoToBack from "@/components/GoToBack";
import CatalogDetail from "@/features/Catalog/components/CatalogDetail";

const CatalogDetailPage = () => {
  return (
    <>
      <div className="container">
        <GoToBack pathArr={[{ title: "catalog", path: "/catalog" }]} />
      </div>
      <CatalogDetail />
    </>
  );
};

export default CatalogDetailPage;
