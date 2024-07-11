import React, { useEffect, useState } from "react";
import GoToBack from "@/components/GoToBack";
import CatalogDetail from "@/features/Catalog/components/CatalogDetail";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useRouter } from "next/router";

const CatalogDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [catalogItemsData, setCatalogItemsData] = useState(null);

  const { appendData: getCatalogItemsData } = useQueryApiClient({
    request: {
      url: `sub-categories-from-taobao?categoryId=${id}`,
      method: "GET",
    },
    onSuccess(res) {
      setCatalogItemsData(res.sub_categories);
    },
  });

  useEffect(() => {
    if (id) {
      getCatalogItemsData();
    }
  }, [getCatalogItemsData, id]);
  return (
    <>
      <div className="container">
        <GoToBack pathArr={[{ title: "catalog", path: "/catalog" }]} />
      </div>
      <CatalogDetail data={catalogItemsData} />
    </>
  );
};

export default CatalogDetailPage;
