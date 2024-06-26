import React from "react";
import styles from "./ProductOrderSection.module.scss";
import { Button,  } from "antd";
import { MinusSvg, PlusSvg } from "$/assets/images";
import Image from "next/image";

const ProductOrderSection = ({ product}: any) => {
  return (
    <div className={styles.product_order}>
      <div className={styles.priceSection}>
        <span className={styles.currentPrice}>{product.discounted_price} uzs</span>
        <span className={styles.discount}>-{product.discount_percentage}%</span>
        <span className={styles.originalPrice}>
          {product.price} uzs
        </span>
      </div>
      <div className={styles.sizeSelector}>
        {product.sizes.map((size: any, index: number) => (
          <div key={index} className={styles.size}>
            <span>{size.value}</span>
            <div className={styles.change_value}>
              <Button>
                <Image src={MinusSvg} width={24} height={24} alt='#' />
              </Button>
              <h4>{0}</h4>
              <Button disabled>
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
