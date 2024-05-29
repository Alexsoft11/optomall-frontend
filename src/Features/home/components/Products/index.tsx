import React from "react";
import styles from "./Products.module.scss";
import { CustomTabs } from "@/ui/Tabs";
import TabPane from "antd/es/tabs/TabPane";
import { CardsMockData } from "@/mockdata/Cards";
import { ProductTabsData } from "@/constants/products";
import Card from "@/Components/Card";

const Products = () => {
  return (
    <>
      <div className={styles.products}>
        <div className="container">
          <div className={styles.products__inner}>
            <div className={styles.products__top}>
              <CustomTabs className="products_tab">
                {ProductTabsData.map((tab) => (
                  <TabPane
                    key={tab.key}
                    tab={tab.tab}
                    className={styles.products__item}
                  ></TabPane>
                ))}
              </CustomTabs>
            </div>

            <div className={styles.products__cards}>
              {CardsMockData.map((el: any, idx: number) => (
                <Card key={el.id} path={el.id} data={el} idx={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
