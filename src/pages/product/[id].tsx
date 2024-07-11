import PageLayout from "@/components/Layout/PageLayout";
import { ProductDetailSection } from "@/features/ProductDetail";
import { API } from "@/services/api";
import { LoadingSpinner } from "@/ui/Spin";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";

interface ProductDetailProps {
  product: any;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const router = useRouter();
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

export const getServerSideProps: GetServerSideProps = async (context:any) => {
  const { id: productId } = context.params;

  try {
    const product = (await API.getProductDetail(productId))
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
