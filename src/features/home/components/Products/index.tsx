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
import Image from "next/image";
import Card from "@/components/Card";
import { getProductLimit } from "@/utils/getProductLimit";
import AditionalProductList from "../AditionalProductList";


const ProductsSection = () => {
  const t = useTranslations();
  const { query, locale } = useRouter();
  const [keyApi, setKeyApi] = useState("discount");

  const {
    homeProducts,
    hasMore,
    isBack,
    setHasMore,
    setHomeProducts,
    setIsBack
  } = useProductStore();

  const handleTabChange = (key: string) => {
    const productsCount = getProductLimit(5)
    getProductsData({ query: key, productsCount });
    setKeyApi(key);
  };

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

  useEffect(() => {
    if (!isBack || !homeProducts.length) {
      const productsCount = getProductLimit(5)
      getProductsWhenScrool({ query: "discount", lang: locale, productsCount });
      const limit = getProductLimit(3)
      getAditionalCats({ limit })
    } else {
      setIsBack(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            {additionalCategories?.categories?.map((item: any, idx: number) => (
              <div key={idx} className={styles.products__categories_inner}>
                <div className={styles.products__banner}>
                  <Image
                    src={item?.image}
                    width={10000}
                    height={10000}
                    alt="banner img"
                  />
                </div>
                <AditionalProductList category={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
