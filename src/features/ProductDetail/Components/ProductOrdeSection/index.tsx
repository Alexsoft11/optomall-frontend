import React from "react";
import styles from "./ProductOrderSection.module.scss";
import { Button,  } from "antd";
import { MinusSvg, PlusSvg } from "$/assets/images";
import Image from "next/image";

const ProductOrderSection = ({ productDetails,  }: any) => {
  return (
    <div className={styles.product_order}>
      <div className={styles.priceSection}>
        <span className={styles.currentPrice}>{productDetails.price} uzs</span>
        <span className={styles.discount}>-{productDetails.discount}%</span>
        <span className={styles.originalPrice}>
          {productDetails.originalPrice} uzs
        </span>
      </div>
      <div className={styles.sizeSelector}>
        {productDetails.sizes.map((size: any, index: number) => (
          <div key={index} className={styles.size}>
            <span>{size}</span>
            <div className={styles.change_value}>
              <Button>
                <Image src={MinusSvg} width={24} height={24} alt='#' />
              </Button>
              <h4>{0}</h4>
              <Button>
                <Image src={PlusSvg} width={24} height={24} alt='#' />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <button className={styles.addToCart}>В корзину</button>
    </div>
  );
};

export default ProductOrderSection;
