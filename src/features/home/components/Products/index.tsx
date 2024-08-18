import React, { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import { CustomTabs } from "@/ui/Tabs";
import TabPane from "antd/es/tabs/TabPane";
import { ProductTabsData } from "@/constants/products";
import { CardInterface } from "@/interfaces";
import { useTranslations } from "next-intl";
import { LoadingSpinner } from "@/ui/Spin";
import { CategoryInterface } from "../../interfaces";
import Image from "next/image";
import dynamic from "next/dynamic";

const Card = dynamic(() => import("@/components/Card"));

interface Props {
  products: CardInterface[];
  categoryData: CategoryInterface[];
  getProductsData: any;
  isProductsLoading: any;
}

const Products = ({
  categoryData,
  getProductsData,
  products,
  isProductsLoading,
}: Props) => {
  const t = useTranslations();

  const handleTabChange = (key: string) => {
    getProductsData({ query: key });
  };

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
                spinning={true}
                tip={"loadingData"}
                size="large"
              />
            ) : (
              products?.map((el: CardInterface, idx: number) => (
                <Card isBlank={true} key={el.id} data={el} provider={el.provider} />
              ))
            )}
          </div>
          <div className={styles.products__categories}>
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
                    <Card isBlank={true} key={idx} data={el} provider="local" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
