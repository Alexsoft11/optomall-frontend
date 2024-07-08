import PageLayout from "@/components/Layout/PageLayout";
import { ProductDetailSection } from "@/features/ProductDetail";
import { LoadingSpinner } from "@/ui/Spin";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const ProductDetail = () => {
  const params= useParams();
  const productId =params?.id
  const [product, setProduct] = useState<any>(null);


  const { appendData: getProductsData, isLoading: isProductsLoading } = useQueryApiClient({
    request: {
      url: `product-detail-from-taobao?productId=${productId}`,
      method: 'GET',
      disableOnMount: true,
    },
    onSuccess(res) {
  
      setProduct(res);
    },
  });
  

  useEffect(() => {
    if (productId) {
      getProductsData();
    }
  }, [productId]);
 const router = useRouter()

 const  user = true
console.log(product)
 useEffect(() => {
  if (!user) {
    router.push('/en');
  }
}, [user, router]);
console.log(isProductsLoading)
 const title = product?.detail.title 
 if(isProductsLoading){
 return <LoadingSpinner/>
 }
  return (
    <PageLayout metaTitle={title}>
      {product ? <ProductDetailSection product={product.detail} recommended={product.recommended}/> : <p>No product found.</p>}
    </PageLayout>
  );
};

export default ProductDetail;
