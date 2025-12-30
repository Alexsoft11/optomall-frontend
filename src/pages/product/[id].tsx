import PageLayout from "@/components/Layout/PageLayout";
import { ProductDetailSkeleton } from "@/ui/Skeleton";
import { useRouter } from "next/router";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import useQueryApiClient from "@/utils/useQueryApiClient";
import useProductStore from "@/store/useProductStore";
import PageNoItems from "@/components/PageNoItems";
import { useTranslations } from "next-intl";

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
  const [isSyncing, setIsSyncing] = useState(false);
  const [productData, setProductData] = useState<any>(null);
  const [scoreData, setScoreData] = useState<any>(null);

  const productId = useMemo(() => {
    const id = query.id ? String(query.id) : "";
    return id.replace(/^abb-/, "");
  }, [query.id]);

  const provider = useMemo(() => {
    return String(query.provider || "1688");
  }, [query.provider]);

  // First request: Get cached product (fast, local)
  const { appendData: getCachedProduct } = useQueryApiClient({
    request: {
      url: `cached-product`,
      method: "GET",
      disableOnMount: true,
    },
    onSuccess(response) {
      if (response?.exists && response?.detail) {
        // Show cached data immediately
        setProductData(response.detail);
        setScoreData(response.score);
        setShowSkeleton(false);

        // If cache is expired, trigger background sync
        if (response.needs_sync) {
          triggerBackgroundSync();
        }
      } else if (response?.needs_fetch) {
        // No cache exists, fetch from TMAPI
        fetchFromTmapi();
      }
    },
    onError() {
      // Cache request failed, try TMAPI directly
      fetchFromTmapi();
    },
  });

  // Second request: Sync product (background, TMAPI)
  const { appendData: syncProduct } = useQueryApiClient({
    request: {
      url: `sync-product`,
      method: "POST",
      disableOnMount: true,
    },
    onSuccess(response) {
      setIsSyncing(false);
      if (response?.detail) {
        // Update with fresh data
        setProductData(response.detail);
        setScoreData(response.score);
      }
    },
    onError() {
      setIsSyncing(false);
      // Keep showing cached data on error
    },
  });

  // Fallback: Direct TMAPI request (when no cache)
  const { appendData: fetchTmapi } = useQueryApiClient({
    request: {
      url: `product-detail-tmapi`,
      method: "GET",
      disableOnMount: true,
    },
    onSuccess(response) {
      if (response?.detail) {
        setProductData(response.detail);
        setScoreData(response.score);
        setShowSkeleton(false);
      }
    },
    onError(response) {
      setError(response);
      setShowSkeleton(false);
    },
  });

  // Similar products search
  const { appendData: getSearchRes, data: recomendProducts } =
    useQueryApiClient({
      request: {
        url: `search-products-from-tmapi?imageUrl=${productData?.image}&lang=${locale}&provider=${provider}`,
        method: "GET",
        disableOnMount: true,
      },
    });

  const triggerBackgroundSync = useCallback(() => {
    setIsSyncing(true);
    syncProduct({
      productId,
      provider,
      lang: locale,
    });
  }, [productId, provider, locale, syncProduct]);

  const fetchFromTmapi = useCallback(() => {
    fetchTmapi({
      productId,
      lang: locale,
      provider,
    });
  }, [productId, locale, provider, fetchTmapi]);

  // Initial load: Get cached product first
  useEffect(() => {
    if (isReady && productId) {
      setShowSkeleton(true);
      setError(undefined);
      setProductData(null);
      setScoreData(null);

      getCachedProduct({
        productId,
        provider,
        lang: locale,
      });
    }
  }, [productId, provider, locale, isReady]);

  // Load similar products when we have image
  useEffect(() => {
    if (productData?.image) {
      getSearchRes();
    }
  }, [productData?.image]);

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

  const handleNavigateSearchPage = useCallback(() => {
    const imageUrl = errorData?.homeProduct?.image || productData?.image;
    if (imageUrl) {
      push(`/search?lang=${locale}&provider=${provider}&imageUrl=${imageUrl}`);
    }
  }, [errorData, productData, locale, provider, push]);

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

  if (errorData && !showSkeleton && !productData) {
    return (
      <PageNoItems
        title={t("Products.refresh_error_text")}
        text={t("Search.refresh_page")}
        customBtnFunc={() => window.location.reload()}
      />
    );
  }

  const title = productData?.title || t("Product-detail.loading");

  return (
    <PageLayout metaTitle={title}>
      {showSkeleton ? (
        <ProductDetailSkeleton />
      ) : (
        productData && (
          <ProductDetailSection
            product={productData}
            recommended={recomendProducts?.products}
            score={scoreData}
          />
        )
      )}
    </PageLayout>
  );
};

export default ProductDetail;
