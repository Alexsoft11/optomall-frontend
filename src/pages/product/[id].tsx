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
import useQueryApiClient from "@/utils/useQueryApiClient";

interface ProductDetailProps {
  product: any;
  productComments: IProductComments[];
  score: any;
}

const ProductDetailSection = dynamic(
  () => import("@/features/ProductDetail/Components/ProductDetailSection"),
  {
    loading: () => <LoadingSpinner fullscreen={true} size="large" />,
  }
);

const ProductDetail = ({ product }: ProductDetailProps) => {
  const { query } = useRouter();

  const { data: productComments } = useQueryApiClient({
    request: {
      url: `get-comments?product_id=${query.id}`,
      method: "GET",
      disableOnMount: !query.id,
    },
    enabled: !!query.id,
  });

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
    const channel = context.query.channel || "taobao";
    const cookies = cookie.parse(context.req.headers.cookie || "");
    const token = decodeURIComponent(cookies.token);
    const params = {
      productId: context.params.id,
      lang: context.locale,
      provider: channel,
    };
    const product = await API.getProductDetailToken(params, token);

    // const productComments = await API.getProductComments(id);

    return {
      props: {
        product,
        productComments: [],
      },
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
    return {
      props: {
        product: null,
        productComments: null,
      },
    };
  }
};

export default ProductDetail;
