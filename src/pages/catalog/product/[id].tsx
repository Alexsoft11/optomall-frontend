import React, { useEffect, useState } from "react";
import GoToBack from "@/components/GoToBack";
import CatalogProduct from "@/features/Catalog/components/CatalogProduct";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { message } from "antd";
import { useRouter } from "next/router";

const CatalogProductPage = () => {
  const router = useRouter();
    const { id } = router.query;
    const [productData, setProductData] = useState(null);
    console.log('product',productData)

    const { appendData: getProductData } = useQueryApiClient({
      request: {
          url: `products-from-taobao?subCategoryId=${id}&productsCount=15`,
          method: 'GET',
      },
      onSuccess(res) {
        setProductData(res.products)
        console.log(res)
      },
    })
  
    useEffect(() => {
      if (id) {
        getProductData();
      }
    }, [id]);
  return (
    <>
      <div className="container">
        <GoToBack pathArr={[{ title: "catalog", path: "/catalog" }]} />
      </div>
      <CatalogProduct data={productData} />
    </>
  );
};

export default CatalogProductPage;
