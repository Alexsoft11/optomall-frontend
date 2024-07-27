/** @format */

import PageLayout from "@/components/Layout/PageLayout";
import { API } from "@/services/api";
import { LoadingSpinner } from "@/ui/Spin";

import { useRouter } from "next/router";
import React from "react";
import dynamic from "next/dynamic";
import cookie from "cookie";
import DataNotFound from "@/ui/DataNotFound";
import { IProductComments } from "@/features/ProductDetail/interface";

interface ProductDetailProps {
  product: any;
  productComments: IProductComments[];
  score: any;
}

const ProductDetailSection = dynamic(
  () => import("@/features/ProductDetail/Components/ProductDetailSection"),
  {
    loading: () => <LoadingSpinner fullscreen={true} size='large' />,
  }
);

const ProductDetail = ({ product, productComments }: ProductDetailProps) => {
  if (!product) {
    return <DataNotFound />;
  }
  const title = product?.detail.title;

  return (
    <PageLayout metaTitle={title}>
      <ProductDetailSection
        product={product.detail}
        productComments={productComments}
        recommended={product.recommended}
        score={product.score}
      />
    </PageLayout>
  );
};

export const getServerSideProps = async (context: any) => {
  try {
    const { id: productId } = context.params;
    const lang = context.locale;
    const cookies = cookie.parse(context.req.headers.cookie || "");
    const token = decodeURIComponent(cookies.token);
    const product = await API.getProductDetailToken(productId, lang, token);
    const productComments = await API.getProductComments(productId)
      .then((res: any) => res.data)
      .catch((error: any) => {
        return null;
      });
    return {
      props: {
        product,
        productComments:productComments
      },
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
    return {
      props: {
        product: null,
        productComments:null
      },
    };
  }
};

export default ProductDetail;
