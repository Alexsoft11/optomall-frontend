import PageLayout from "@/components/Layout/PageLayout";
import { LoadingSpinner } from "@/ui/Spin";

import { useRouter } from "next/router";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import DataNotFound from "@/ui/DataNotFound";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { message } from "antd";
import useSearchStore from "@/store/useSearchStore";



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

const ProductDetail = () => {
  const { query, locale, beforePopState } = useRouter();
  const { setIsBack } = useSearchStore();


  const { data: product, appendData, isLoading, isError } = useQueryApiClient({
    request: {
      url: `product-detail-onbound`,
      method: "GET",
      disableOnMount: true,
    },
  });

  const {
    appendData: getSearchRes,
    data: recomendProducts,
  } = useQueryApiClient({
    request: {
      url: `search-products-from-taobao?imageUrl=${product?.detail?.image}&lang=${locale}&provider=${query.provider}`,
      method: "GET",
      disableOnMount: true,
    },
  });

  const { data: productComments, appendData: getComments } = useQueryApiClient({
    request: {
      url: `get-comments?product_id=${query.id}`,
      method: "GET",
      disableOnMount: false,
    },
  });

  useEffect(() => {
    if (query.id) {
      const id: any = query.id ? query.id : ""
      const productId = id.replace(/^abb-/, '')
      const params = {
        productId: productId,
        lang: locale,
        provider: query.provider,
      };
      appendData(params)
      getComments()
    }
  }, [query, locale])


  useEffect(() => {
    if (product?.detail?.image) {
      getSearchRes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.detail?.image]);

  useEffect(() => {
    const handleBack = () => {
      setIsBack(true)
    };

    beforePopState(() => {
      handleBack();
      return true;
    });

    return () => {
      beforePopState(() => true);
    };
  }, [beforePopState]);

  if (isError) {
    return <DataNotFound />;
  }
  const title = product?.detail?.title;
  return (
    <>
      {isLoading ? <LoadingSpinner size="large" fullscreen /> : product?.detail && (
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
      )}
    </>
  );
};

export default ProductDetail;
