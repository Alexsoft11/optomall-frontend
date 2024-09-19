import PageLayout from "@/components/Layout/PageLayout";
import { API } from "@/services/api";
import { LoadingSpinner } from "@/ui/Spin";

import { useRouter } from "next/router";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import DataNotFound from "@/ui/DataNotFound";
import { IProductComments } from "@/features/ProductDetail/interface";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { message } from "antd";

interface ProductDetailProps {
  product: any;
  productComments: IProductComments[];
  score: any;
  error: any;
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

const ProductDetail = ({ product, error }: ProductDetailProps) => {
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
      url: `search-products-from-taobao?imageUrl=${product?.detail?.image}&lang=${locale}&provider=${query.provider}`,
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

  if (error) {
    console.error(error);
  }

  if (!product) {
    return <DataNotFound />;
  }
  const title = product?.detail?.title;

  return (
    <PageLayout metaTitle={title}>
      {query.provider === "local" ? (
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
interface ErrorResponse {
  message: string;
  [key: string]: any;
}

export const getServerSideProps = async (context: any) => {
  try {
    const provider = context.query.provider || "1688";
    const productId = context.params.id.replace(/^abb-/, '');
    //context.locale
    const params = {
      productId: productId,
      lang: 'zh-CN',
      provider: provider,
    };

    let product = await API.getProductDetail(params);
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
    const errorMessage =
      (error as Error).message ||
      "An error occurred while fetching the product data";
    const errorData: ErrorResponse = (error as any).response?.data || {
      message: errorMessage,
    };

    return {
      props: {
        product: null,
        error: errorData,
      },
    };
  }
};

export default ProductDetail;
