/** @format */

import React, { useEffect, useState } from "react";
import styles from "./ProductDetailSection.module.scss";
import ProductDetailImages from "../ProductDetailImages";
import ProductDetailInfo from "../ProductDetailInfo";
import Reviews from "../Reviews";
import RecomendedProducts from "../RecomendedProducts";
const ProductDetailSection = ({
  product,
  recommended,
  score,
  productComments,
}: any) => {
  const [selectedImage, setSelectedImage] = useState(product?.image);
  useEffect(() => {
    setSelectedImage(product?.image);
  }, [product]);
  return (
    <>
      <div className='container'>
        <div className='containers'>
          <div className={styles.product}>
            <div className={styles.product__inner}>
              <ProductDetailImages
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                product={product}
              />
              <ProductDetailInfo
                productDetails={score}
                setSelectedImage={setSelectedImage}
                product={product}
              />
            </div>
          </div>
          <Reviews comments={productComments} />
          <RecomendedProducts recomendedData={recommended} />
        </div>
      </div>
    </>
  );
};

export default ProductDetailSection;
