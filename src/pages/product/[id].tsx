import PageLayout from "@/components/Layout/PageLayout";
import { ProductDetailSection } from "@/features/ProductDetail";
import { API } from "@/services/api";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface ProductDetailProps {
  product: any;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const params = useParams();
  // const [product, setProduct] = useState<any>(null);

  // const { appendData: getProductsData, isLoading: isProductsLoading } =
  //   useQueryApiClient({
  //     request: {
  //       url: `product-detail-from-taobao?productId=${params.id}`,
  //       method: "GET",
  //       disableOnMount: true,
  //     },
  //     onSuccess(res) {
  //       setProduct(res);
  //     },
  //   });

  // useEffect(() => {
  //   if (productId) {
  //     getProductsData();
  //   }
  // }, [productId]);
  const router = useRouter();

  const user = true;

  useEffect(() => {
    if (!user) {
      router.push("/en");
    }
  }, [user, router]);

  const title = product?.detail.title;
  return (
    <PageLayout metaTitle={title}>
      {product ? (
        <ProductDetailSection
          product={product.detail}
          recommended={product.recommended}
        />
      ) : (
        <h2>No product found.</h2>
      )}
    </PageLayout>
  );
};
export const getServerSideProps = async (context: any) => {
  try {
    const response = await API.getProductDetail(context.query.id);

    return {
      props: {
        product: response.data || null,
      },
    };
  } catch (error: any) {
    console.error("Error fetching product data:", error.message);
    return {
      props: {
        product: null,
      },
    };
  }
};
export default ProductDetail;
