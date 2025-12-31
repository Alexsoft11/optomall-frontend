import React, { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import { CustomTabs } from "@/ui/Tabs";
import TabPane from "antd/es/tabs/TabPane";
import { ProductTabsData } from "@/constants/products";
import { useTranslations } from "next-intl";
import { LoadingSpinner } from "@/ui/Spin";
import useQueryApiClient from "@/utils/useQueryApiClient";
import Products from "@/components/Products";
import { useRouter } from "next/router";
import useProductStore from "@/store/useProductStore";
import { getProductLimit } from "@/utils/getProductLimit";
import AdditionalCategory from "@/components/AdditionalCategory";

/*************  ✨ Codeium Command 🌟  *************/
/**
 * ProductsSection component
 * @returns {ReactElement} - React component
 */
const ProductsSection = () => {
  const t = useTranslations();
  const { query, locale } = useRouter();
  const [keyApi, setKeyApi] = useState("discount");

  /**
   * Get products from store
   * @property {Array} homeProducts - Products from store
   * @property {boolean} hasMore - Has more products
   * @property {boolean} isBack - Is back from another page
   * @property {Function} setHasMore - Set has more products
   * @property {Function} setHomeProducts - Set products from store
   * @property {Function} setIsBack - Set is back from another page
   */
  const {
    homeProducts,
    hasMore,
    isBack,
    setHasMore,
    setHomeProducts,
    setIsBack,
  } = useProductStore();

  /**
   * Handle tab change
   * @param {string} key - Tab key
   */
  const handleTabChange = (key: string) => {
    const productsCount = getProductLimit(15);
    getProductsData({ query: key, productsCount });
    setKeyApi(key);
  };

  /**
   * Handle get product when scrool
   * @param {Object} custom - Custom data
   */
  const handleGetProductWhenScrool = (custom?: any) => {
    if (query) {
      getProductsWhenScrool({
        ...custom,
        ...query,
        lang: locale,
        query: keyApi,
      });
    }
  };

  /**
   * Get products data on mount
   */
  useEffect(() => {
    if (isBack && homeProducts.length > 0) {
      setIsBack(false);
    } else {
      const productsCount = getProductLimit(15);
      getProductsWhenScrool({ query: "discount", lang: locale, productsCount });
      const limit = getProductLimit(10);
      getAditionalCats({ limit });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Get products when scrool
   * @property {Function} appendData - Append data
   * @property {boolean} isLoading - Is loading
   */
  const {
    appendData: getProductsWhenScrool,
    isLoading: isProductsScroolLoading,
  } = useQueryApiClient({
    request: {
      url: `products`,
      method: "GET",
      disableOnMount: true,
    },
    onSuccess(res: any) {
      if (!res.products.length) {
        setHasMore(false);
        return;
      }
      setHomeProducts([...homeProducts, ...res.products]);
    },
  });

  /**
   * Get products data
   * @property {Function} appendData - Append data
   * @property {boolean} isLoading - Is loading
   */
  const { appendData: getProductsData, isLoading: isProductsLoading } =
    useQueryApiClient({
      request: {
        url: `products`,
        method: "GET",
        disableOnMount: true,
      },
      onSuccess(res: any) {
        if (res.products) {
          setHomeProducts(res.products);
        }
      },
    });

  /**
   * Get aditional categories
   * @property {any} data - Data
   * @property {Function} appendData - Append data
   */
  const { data: additionalCategories, appendData: getAditionalCats } =
    useQueryApiClient({
      request: {
        url: `additional-categories`,
        method: "GET",
        disableOnMount: true,
      },
    });

  return (
    <div className={styles.products}>
      <div className="container">
        <div className={styles.products__inner}>
          <div className={styles.products__top}>
            <CustomTabs className="products_tab" onChange={handleTabChange}>
              {ProductTabsData.map((tab) => (
                <TabPane
                  key={tab.key}
                  tab={t(`Products.${tab.tab}`)}
                  className={styles.products__item}
                />
              ))}
            </CustomTabs>
          </div>

          <div className={styles.product_sec}>
            <div className={styles.products__cards}>
              {isProductsLoading ? (
                <LoadingSpinner
                  spinning={isProductsLoading}
                  tip={"loadingData"}
                  size="large"
                />
              ) : (
                <Products
                  type="more"
                  perPage={1}
                  data={homeProducts}
                  hasMore={hasMore}
                  handleGetProduct={handleGetProductWhenScrool}
                  scroolLoading={isProductsScroolLoading}
                />
              )}
            </div>
          </div>
          <div className={styles.products__categories}>
            <AdditionalCategory
              categories={additionalCategories?.categories}
              enableLink={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
