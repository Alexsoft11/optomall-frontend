import PageLayout from "@/components/Layout/PageLayout";
import { ProductDetailSection } from "@/features/ProductDetail";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ProductDetail = () => {
  const params= useParams();
  const productId = params?.id
  const [product, setProduct] = useState<any>(null);
  console.log(productId) 

  const { appendData: getProductsData, isLoading: isProductsLoading } = useQueryApiClient({
    request: {
      url: `product-detail-from-taobao?productId=${productId}`,
      method: 'GET',
      disableOnMount: true,
    },
    onSuccess(res) {
      console.log(res);
      setProduct(res.detail);
    },
    onError(error) {
      console.error("Error fetching product details:", error);
    }
  });

  useEffect(() => {
    if (productId) {
      getProductsData();
    }
  }, [productId]);

  if (isProductsLoading) {
    return <p>Loading...</p>;
  }
 const title = product?.title 
  return (
    <PageLayout metaTitle={title}>
      {product ? <ProductDetailSection product={product} /> : <p>No product found.</p>}
    </PageLayout>
  );
};

export default ProductDetail;
