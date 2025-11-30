import PageLayout from "@/components/Layout/PageLayout";
import { LoadingSpinner } from "@/ui/Spin";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DataNotFound from "@/ui/DataNotFound";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { message } from "antd";
import useProductStore from "@/store/useProductStore";
import PageNoItems from "@/components/PageNoItems";
import { useTranslations } from "next-intl";

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
  const { query, locale, beforePopState, push } = useRouter();
  const { setIsBack } = useProductStore();
  const t = useTranslations("");
  const [errorData, setError] = useState<any>(undefined);

  const {
    data: product,
    appendData,
    isLoading,
    isError,
  } = useQueryApiClient({
    request: {
      url: `product-detail-tmapi`,
      method: "GET",
      disableOnMount: true,
    },
    onError(response) {
      setError(response);
    },
  });

  const { appendData: getSearchRes, data: recomendProducts } =
    useQueryApiClient({
      request: {
        url: `search-products-from-tmapi?imageUrl=${product?.detail?.image}&lang=${locale}&provider=${query.provider}`,
        method: "GET",
        disableOnMount: true,
      },
    });

  useEffect(() => {
    if (query.id) {
      const id: any = query.id ? query.id : "";
      const productId = id.replace(/^abb-/, "");
      const params = {
        productId: productId,
        lang: locale,
        provider: query.provider,
      };
      appendData(params);
    }
  }, [query, locale]);

  useEffect(() => {
    if (product?.detail?.image) {
      getSearchRes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.detail?.image]);

  const handleNavigateSearchPage = () => {
    if (errorData?.homeProduct?.image) {
      push(
        `/search?lang=${locale}&provider=${query.provider || "1688"}&imageUrl=${
          errorData?.homeProduct?.image
        }`
      );
    }
  };

  useEffect(() => {
    const handleBack = () => {
      setIsBack(true);
    };

    beforePopState(() => {
      handleBack();
      return true;
    });

    return () => {
      beforePopState(() => true);
    };
  }, [beforePopState]);

  if (errorData?.error === "product_not_found") {
    return (
      <PageNoItems
        title={t("Products.product_not_found")}
        text={
          errorData?.homeProduct?.image
            ? t("Products.search_same_products")
            : undefined
        }
        customBtnFunc={handleNavigateSearchPage}
      />
    );
  }

  if (isError) {
    return (
      <PageNoItems
        title={t("Products.refresh_error_text")}
        text={t("Search.refresh_page")}
        customBtnFunc={() => window.location.reload()}
      />
    );
  }
  const title = product?.detail?.title;
  return (
    <>
      {isLoading ? (
        <LoadingSpinner size="large" fullscreen />
      ) : (
        product?.detail && (
          <PageLayout metaTitle={title}>
            {/* {query.provider === "local" ? (
              <ProductDetailSectionLocal
                product={product.detail}
                recommended={recomendProducts.products}
                score={product.score}
              />
            ) : ( */}
            <ProductDetailSection
              product={product.detail}
              recommended={recomendProducts.products}
              score={product.score}
            />
            {/* )} */}
          </PageLayout>
        )
      )}
    </>
  );
};

export default ProductDetail;
