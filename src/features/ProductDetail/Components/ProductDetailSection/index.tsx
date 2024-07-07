/** @format */

import React, { useState } from "react";
import styles from "./ProductDetailSection.module.scss";
import ProductDetailImages from "../ProductDetailImages";
import { detailData, productDetails } from "@/mockdata/detailData";
import ProductDetailInfo from "../ProductDetailInfo";
import Reviews from "../Reviews";
import RecomendedProducts from "../RecomendedProducts";
const ProductDetailSection = ({product, recommended}:any) => {
  // console.log(detailData);

  const [selectedImage, setSelectedImage] = useState(product?.image);

  return (
    <>
      <div className='containers'>
        <div className={styles.product}>
          <div className={styles.product__inner}>
            <ProductDetailImages selectedImage={selectedImage} setSelectedImage={setSelectedImage} product={product}/>
            <ProductDetailInfo productDetails={productDetails} setSelectedImage={setSelectedImage} product={product}/>
          </div>
        </div>
        <Reviews />
        <RecomendedProducts recomendedData={recommended}/>
      </div>
    </>
  );
};

export default ProductDetailSection;
