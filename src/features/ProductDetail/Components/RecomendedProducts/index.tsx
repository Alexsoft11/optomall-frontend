import Card from "@/components/Card";
import { CardInterface } from "@/interfaces";
import React, { FC } from "react";
import styles from "./RecomendedProducts.module.scss";
interface IProps {
  recomendedData: CardInterface[];
}
const RecomendedProducts: FC<IProps> = ({ recomendedData }) => {
  return (
    <div>
      <h3 className={styles.title}>Похожие товары</h3>
      <div className={styles.cards}>
        {recomendedData.map((el: any, idx: number) => (
          <Card key={idx} idx={idx} data={el} />
        ))}
      </div>
    </div>
  );
};

export default RecomendedProducts;
