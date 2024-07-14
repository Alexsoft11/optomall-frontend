import React, { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import { CustomTabs } from "@/ui/Tabs";
import TabPane from "antd/es/tabs/TabPane";
import Card from "@/components/Card";
import { ProductTabsData } from "@/constants/products";
import { CardInterface } from "@/interfaces";
import { useTranslations } from "next-intl";
import { LoadingSpinner } from "@/ui/Spin";
import useQueryApiClient from "@/utils/useQueryApiClient";

interface Props {
  products: CardInterface[];
}

const Products = ({ products }: Props) => {
  const t = useTranslations()
  const [productsChange, setProducts] = useState<CardInterface[]>(products);

  const { appendData: getProductsData, isLoading: isProductsLoading } = useQueryApiClient({
    request: {
      url: `products?query=&tab=:tab`,
      method: 'GET',
      disableOnMount: true,
    },
    onSuccess(res: any) {
      setProducts(res.products);
    }
  });

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
                  tab={t(`Products.${tab.tab}`)}
                  className={styles.products__item}
                />
              ))}
            </CustomTabs>
          </div>

          <div className={styles.products__cards}>
            {isProductsLoading ? (
              <LoadingSpinner  spinning={true} tip={'loadingData'} size="large" />
            ) : (
              productsChange?.map((el: CardInterface, idx: number) => (
                <Card key={el.id}  data={el} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
