import PageLayout from "@/components/Layout/PageLayout";
import { API } from "@/services/api";
import { LoadingSpinner } from "@/ui/Spin";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import dynamic from "next/dynamic";

interface ProductDetailProps {
  product: any;
}

const ProductDetailSection = dynamic(
  () => import("@/features/ProductDetail/Components/ProductDetailSection"),
  {
    loading: () => <LoadingSpinner fullscreen={true} size="large" />,
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
      />
    </PageLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { id: productId } = context.params;

  try {
    const product = await API.getProductDetail(productId);
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
