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
    getProductsData({ query: key });
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
      getProductsWhenScrool({ query: "discount", lang: locale, });
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

          <div className={styles.products__cards}>
            {isProductsLoading ? (
              <LoadingSpinner
                spinning={isProductsLoading}
                tip={"loadingData"}
                size="large"
              />
            ) : (
              <Products
                type="scroll"
                perPage={1}
                data={homeProducts}
                hasMore={hasMore}
                handleGetProduct={handleGetProductWhenScrool}
                scroolLoading={isProductsScroolLoading}
              />
            )}
          </div>

          {/* <div className={styles.products__categories}>
            {categoryData?.map((item: any, idx: number) => (
              <div key={idx} className={styles.products__categories_inner}>
                <div className={styles.products__banner}>
                  <Image
                    src={
                      window.innerWidth <= 600
                        ? item?.image_mobile
                        : item?.image
                    }
                    width={10000}
                    height={10000}
                    alt="banner img"
                  />
                </div>

                <div className={styles.products__cards}>
                  {item?.products.map((el: any, idx: number) => (
                    <Card
                      isBlank={false}
                      key={idx}
                      data={el}
                      provider="local"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
