import React from "react";
import styles from "./CatalogProduct.module.scss";
import SearchBtn from "@/components/SearchBtn";
import Card from "@/components/Card";
import SvgSelector from "$/assets/icons/SvgSelector";
import { useTranslations } from "next-intl";
import Products from "@/components/Products";

interface Props {
  data: any;
}

const CatalogProduct = ({ data }: Props) => {
  const t = useTranslations("Search")
  return (
    <>
      <div className={styles.catalog_product}>
        <div className="container">
          <div className={styles.catalog_product__inner}>
            <div className={styles.catalog_product__top}>
              <div className={styles.catalog_product__search}>
                <SearchBtn />
              </div>
              <div className={styles.catalog_product__btns}>
                <button><span>{t("sales")}</span> <SvgSelector id="sorting-svg"/></button>
                <button><span>{t("reputation")}</span> <SvgSelector id="settings-svg"/></button>
                <button><span>{t("longPrice")}</span> <SvgSelector id="sorting-svg"/></button>
                <button><span>{t("downPrice")}</span> <SvgSelector id="settings-svg"/></button>
              </div>
            </div>

            <Products type="simp" data={data}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogProduct;
