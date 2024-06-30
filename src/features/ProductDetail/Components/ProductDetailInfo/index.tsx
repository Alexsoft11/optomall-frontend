/** @format */

import React, { useState } from "react";
import styles from "./ProductDetailInfo.module.scss";
import { Rate } from "antd";
import SliderColors from "../SliderColors";
import ProductOrderSection from "../ProductOrdeSection";

const ProductDetailInfo = ({
  productDetails,
  setSelectedImage,
  product,
}: any) => {
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [selectedColors, setSelectedColors] = useState<number[]>([]);
  const [totalQuantities, setTotalQuantities] = useState<{ [key: number]: number }>({});

  return (
    <div className={styles.product_info_detail}>
      <div className={styles.productInfo}>
        <h1>{product?.title}</h1>
        <div className={styles.rating}>
          <Rate disabled defaultValue={5} />
          <span>{productDetails.rating}</span>
          <span>({productDetails.reviews} купили)</span>
        </div>
        <SliderColors
          data={product.colors}
          setSelectedColor={setSelectedColor}
          selectedColor={selectedColor}
          totalQuantities={totalQuantities}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
        />
        <div className={styles.productSpecs}>
          <li>
            <div className={styles.productSpecs_name}>
              <span>Url</span>
              <div></div>
            </div>
            <p>{productDetails.productId}</p>
          </li>
          <li>
            <div className={styles.productSpecs_name}>
              <span>Состав</span>
              <div></div>
            </div>
            <p>{productDetails.composition}</p>
          </li>
          <li>
            <div className={styles.productSpecs_name}>
              <span>Размер на модели</span>
              <div></div>
            </div>
            <p>{productDetails.modelSize}</p>
          </li>
          <li>
            <div className={styles.productSpecs_name}>
              <span>Страна производства</span>
              <div></div>
            </div>
            <p>{product.location}</p>
          </li>
          <li>
            <div className={styles.productSpecs_name}>
              <span>Особенности модели</span>
              <div></div>
            </div>
            <p>{productDetails.features}</p>
          </li>
        </div>
      </div>
      <ProductOrderSection
        product={product}
        selectedColor={selectedColor}
        setTotalQuantities={setTotalQuantities}
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
      />
    </div>
  );
};

export default ProductDetailInfo;