import { CardInterface } from "@/interfaces";
import React, { FC } from "react";
import styles from "./RecomendedProducts.module.scss";
import Products from "@/components/Products";
import { useTranslations } from "next-intl";

interface IProps {
  recomendedData: CardInterface[];
}
const RecomendedProducts: FC<IProps> = ({ recomendedData }) => {
  const t = useTranslations("Product-detail");
  return (
    <>
      {recomendedData ? (
        <>
          <div>
            <h3 className={styles.title}>{t("recomendeds")}</h3>
            <div className={styles.cards}>
              <Products type="simp" data={recomendedData} />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default RecomendedProducts;
