import React, { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import { CustomTabs } from "@/ui/Tabs";
import TabPane from "antd/es/tabs/TabPane";
import Card from "@/components/Card";
import { ProductTabsData } from "@/constants/products";
import { CardInterface } from "@/interfaces";

interface Props {
  getProductsData: (params: { tab: string }) => void;
  products: CardInterface[];
}

const Products = ({ getProductsData, products }: Props) => {

  const handleTabChange = (key: string) => {
    getProductsData({ tab: key });
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
                  tab={tab.tab}
                  className={styles.products__item}
                />
              ))}
            </CustomTabs>
          </div>

          <div className={styles.products__cards}>
            {
              products.map((el: CardInterface, idx: number) => (
                <Card key={el.id} path={el.id} data={el} idx={idx} />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
