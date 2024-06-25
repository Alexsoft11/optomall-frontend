/** @format */

import React, { useState } from "react";
import styles from "./ProductDetailSection.module.scss";
import ProductDetailImages from "../ProductDetailImages";
// import { detailData, productDetails } from "@/mockdata/detasilData";
import ProductDetailInfo from "../ProductDetailInfo";
import Reviews from "../Reviews";
const ProductDetailSection = ({detailData}:any) => {
  console.log(detailData);
  const [selectedImage, setSelectedImage] = useState(detailData[0].image);

  return (
    <>
      <div className='container'>
        <div className={styles.product}>
          <div className={styles.product__inner}>
            <ProductDetailImages selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
            <ProductDetailInfo productDetails={productDetails} setSelectedImage={setSelectedImage}/>
          </div>
        </div>
        <Reviews />
      </div>
    </>
  );
};

export default ProductDetailSection;
