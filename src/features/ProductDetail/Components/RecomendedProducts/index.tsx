import Card from "@/components/Card";
import { CardInterface } from "@/interfaces";
import React, { FC } from "react";
import styles from "./RecomendedProducts.module.scss";
import Products from "@/components/Products";
interface IProps {
  recomendedData: CardInterface[];
}
const RecomendedProducts: FC<IProps> = ({ recomendedData }) => {
  return (
    <div>
      <h3 className={styles.title}>Похожие товары</h3>
      <div className={styles.cards}>
        <Products type="simp" data={recomendedData}/>
      </div>
    </div>
  );
};

export default RecomendedProducts;
