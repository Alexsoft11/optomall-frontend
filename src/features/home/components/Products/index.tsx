import React, {  useState } from "react";
import styles from "./Products.module.scss";
import { CustomTabs } from "@/ui/Tabs";
import TabPane from "antd/es/tabs/TabPane";
import { ProductTabsData } from "@/constants/products";
import { CardInterface } from "@/interfaces";
import { useTranslations } from "next-intl";
import { LoadingSpinner } from "@/ui/Spin";
import { CategoryInterface } from "../../interfaces";
import dynamic from "next/dynamic";
import useQueryApiClient from "@/utils/useQueryApiClient";
import Products from "@/components/Products";
import { useRouter } from "next/router";
import useSearchStore from "@/components/useSearchStore";

const Card = dynamic(() => import("@/components/Card"));

interface Props {
  productsData: CardInterface[];
  categoryData: CategoryInterface[];
  getProductsData: any;
  isProductsLoading: any;
}

const ProductsSection = ({ categoryData }: Props) => {
  const t = useTranslations();
  const { query, locale } = useRouter();
  const [keyApi, setKeyApi] = useState("discount");

  const {
    products,
    hasMore,
    setProducts,
    setHasMore,
  } = useSearchStore();

  const isEntered = typeof window !== "undefined" ? sessionStorage.getItem("isEnter") : null;

  const handleTabChange = (key: string) => {
    getProductsData({ query: key });
    setKeyApi(key);
  };

  const handleGetProductWhenScrool = (custom?: any) => {
    if (!isEntered && query) {
      getProductsWhenScrool({
        ...custom,
        ...query,
        lang: locale,
        query: keyApi,
      });
    } else {
      sessionStorage.removeItem("isEnter");
    }
  };


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
      setProducts([...products, ...res.products]);
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
          setProducts(res.products);
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
                data={products}
                hasMore={hasMore}
                handleGetProduct={handleGetProductWhenScrool}
              />
            )}
          </div>
          <LoadingSpinner
            spinning={isProductsScroolLoading}
            tip={"loadingData"}
            size="large"
          />
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
