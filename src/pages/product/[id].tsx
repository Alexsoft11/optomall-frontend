/** @format */

import PageLayout from "@/components/Layout/PageLayout";
import { API } from "@/services/api";
import { LoadingSpinner } from "@/ui/Spin";

import { useRouter } from "next/router";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import cookie from "cookie";
import DataNotFound from "@/ui/DataNotFound";
import { IProductComments } from "@/features/ProductDetail/interface";
import useQueryApiClient from "@/utils/useQueryApiClient";
import GoToBack from "@/components/GoToBack";

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

const ProductDetailSectionLocal = dynamic(
  () =>
    import("@/features/ProductDetailOld/Components/ProductDetailSectionOld"),
  {
    loading: () => <LoadingSpinner fullscreen={true} size="large" />,
  }
);

const ProductDetail = ({ product }: ProductDetailProps) => {
  const { query, locale } = useRouter();
  const { data: productComments } = useQueryApiClient({
    request: {
      url: `get-comments?product_id=${query.id}`,
      method: "GET",
      disableOnMount: !query.id,
    },
    enabled: !!query.id,
  });

  const {
    appendData: getSearchRes,
    data: recomendProducts,
    isLoading: isSearchResLoading,
  } = useQueryApiClient({
    request: {
      url: `search-products-from-taobao?imageUrl=${product?.detail?.image}&lang=${locale}&provider=${query.channel}`,
      method: "GET",
      disableOnMount: true,
    },
  });

  useEffect(() => {
    if (product?.detail?.image) {
      getSearchRes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.detail?.image]);

  if (!product) {
    return <DataNotFound />;
  }
  const title = product?.detail.title;

  return (
    <PageLayout metaTitle={title}>
      {query.channel === "local" ? (
        <ProductDetailSectionLocal
          product={product.detail}
          productComments={productComments}
          recommended={recomendProducts.products}
          score={product.score}
        />
      ) : (
        <ProductDetailSection
          product={product.detail}
          productComments={productComments}
          recommended={recomendProducts.products}
          score={product.score}
        />
      )}
    </PageLayout>
  );
};

export const getServerSideProps = async (context: any) => {
  try {
    const channel = context.query.channel || "taobao";

    const params = {
      productId: context.params.id,
      lang: "en",
      provider: channel,
    };

    let product;
    if (channel === "local") {
      product = await API.getProductDetailLocal(params);
    } else {
      product = await API.getProductDetail(params);
    }

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
