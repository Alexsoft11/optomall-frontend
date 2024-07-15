/** @format */

import PageLayout from "@/components/Layout/PageLayout";
import { API } from "@/services/api";
import { LoadingSpinner } from "@/ui/Spin";

import { useRouter } from "next/router";
import React from "react";
import dynamic from "next/dynamic";
import cookie from "cookie";

interface ProductDetailProps {
  product: any;
  score: any;
}

const ProductDetailSection = dynamic(
  () => import("@/features/ProductDetail/Components/ProductDetailSection"),
  {
    loading: () => <LoadingSpinner fullscreen={true} size='large' />,
  }
);

const ProductDetail = ({ product }: ProductDetailProps) => {
  if (!product) {
    return <h2>No product found.</h2>;
  }
  const title = product?.detail.title;

  return (
    <PageLayout metaTitle={title}>
      <ProductDetailSection
        product={product.detail}
        recommended={product.recommended}
        score={product.score}
      />
    </PageLayout>
  );
};

export const getServerSideProps = async (context: any) => {
  
  try {
    const { id: productId } = context.params;
    const cookies = cookie.parse(context.req.headers.cookie || "");
    const token = decodeURIComponent(cookies.token);
    console.log(111)
    console.log(token);
    const product = token
      ? await API.getProductDetailToken(productId)
      : await API.getProductDetail(productId);
    // console.log(product)
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
    return {
      props: {
        product: null,
      },
    };
  }
};

export default ProductDetail;
