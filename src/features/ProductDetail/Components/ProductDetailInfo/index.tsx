import React from "react";
import styles from "./ProductDetailInfo.module.scss";
import ProductOrderSection from "../ProductOrdeSection";
import { Rate } from "antd";
import SliderColors from "../SliderColors";




const ProductDetailInfo = ({ productDetails, setSelectedImage }: any) => {
  return (
    <div className={styles.product_info_detail}>
      <div className={styles.productInfo}>
        <h1>{productDetails.title}</h1>
        <div className={styles.rating}>
        <Rate disabled defaultValue={5}/>
          <span>{productDetails.rating}</span>
          <span>({productDetails.reviews} купили)</span>
        </div>
        <SliderColors />
        <div className={styles.productSpecs}>
          <div>
            <span>Url</span>
            <span>{productDetails.productId}</span>
          </div>
          <div>
            <span>Состав</span>
            <span>{productDetails.composition}</span>
          </div>
          <div>
            <span>Размер на модели</span>
            <span>{productDetails.modelSize}</span>
          </div>
          <div>
            <span>Страна производства</span>
            <span>{productDetails.country}</span>
          </div>
          <div>
            <span>Особенности модели</span>
            <span>{productDetails.features}</span>
          </div>
        </div>
      </div>
      <ProductOrderSection productDetails={productDetails} />
    </div>
  );
};

export default ProductDetailInfo;
