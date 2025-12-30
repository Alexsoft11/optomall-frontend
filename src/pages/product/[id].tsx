import PageLayout from "@/components/Layout/PageLayout";
import { ProductDetailSkeleton } from "@/ui/Skeleton";

import { useRouter } from "next/router";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import useQueryApiClient from "@/utils/useQueryApiClient";
import useProductStore from "@/store/useProductStore";
import PageNoItems from "@/components/PageNoItems";
import { useTranslations } from "next-intl";

// Lazy load components with no loading state (we handle loading ourselves)
const ProductDetailSection = dynamic(
  () => import("@/features/ProductDetail/Components/ProductDetailSection"),
  { ssr: false }
);

const ProductDetail = () => {
  const { query, locale, beforePopState, push, isReady } = useRouter();
  const { setIsBack } = useProductStore();
  const t = useTranslations("");
  const [errorData, setError] = useState<any>(undefined);
  const [showSkeleton, setShowSkeleton] = useState(true);

  // Main product data fetch
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
    onSuccess() {
      // Small delay to ensure smooth transition
      setTimeout(() => setShowSkeleton(false), 100);
    },
    onError(response) {
      setError(response);
      setShowSkeleton(false);
    },
  });

  // Recommended products - fetch AFTER main product loads (non-blocking)
  const { appendData: getSearchRes, data: recomendProducts } =
    useQueryApiClient({
      request: {
        url: `search-products-from-tmapi?imageUrl=${product?.detail?.image}&lang=${locale}&provider=${query.provider}`,
        method: "GET",
        disableOnMount: true,
      },
    });

  // Fetch product data when route is ready
  useEffect(() => {
    if (isReady && query.id) {
      const id: any = query.id ? query.id : "";
      const productId = id.replace(/^abb-/, "");
      const params = {
        productId: productId,
        lang: locale,
        provider: query.provider,
      };
      
      // Reset skeleton state for new product
      setShowSkeleton(true);
      setError(undefined);
      
      appendData(params);
    }
  }, [query.id, query.provider, locale, isReady]);

  // Fetch recommended products after main product image is available
  useEffect(() => {
    if (product?.detail?.image) {
      getSearchRes();
    }
  }, [product?.detail?.image]);

  // Handle back navigation
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
  }, [beforePopState, setIsBack]);

  // Memoized navigation handler
  const handleNavigateSearchPage = useCallback(() => {
    if (errorData?.homeProduct?.image) {
      push(
        `/search?lang=${locale}&provider=${query.provider || "1688"}&imageUrl=${
          errorData?.homeProduct?.image
        }`
      );
    }
  }, [errorData, locale, query.provider, push]);

  // Error: Product not found
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

  // Error: General error
  if (isError && !showSkeleton) {
    return (
      <PageNoItems
        title={t("Products.refresh_error_text")}
        text={t("Search.refresh_page")}
        customBtnFunc={() => window.location.reload()}
      />
    );
  }

  const title = product?.detail?.title || t("Product-detail.loading");

  return (
    <PageLayout metaTitle={title}>
      {showSkeleton || isLoading ? (
        <ProductDetailSkeleton />
      ) : (
        product?.detail && (
          <ProductDetailSection
            product={product.detail}
            recommended={recomendProducts?.products}
            score={product.score}
          />
        )
      )}
    </PageLayout>
  );
};

export default ProductDetail;
