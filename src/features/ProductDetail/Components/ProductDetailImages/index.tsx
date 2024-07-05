/** @format */

import React, { useEffect, useState } from "react";
import styles from "./ProductDetailImages.module.scss";
import Image from "next/image";
import dynamic from "next/dynamic";
import { detailData } from "@/mockdata/detailData";
import Detail from "./detail";

// const Detail = dynamic(() => import("./detail"),{ssr:false})

const ProductDetailImages = ({ selectedImage, setSelectedImage,product }: any) => {
  return (  
  <div className={styles.productDetail}>
      <div className={styles.imageThumbnails}>
        {product.pictures.map((item: any) => (
          <div className={styles.imageThumbnails_card}>
            <Image
            fill
              key={item.id}
              src={item.image_url}
              alt={`Thumbnail ${item.id}`}
              onClick={() => setSelectedImage(item.image_url)}
              className={selectedImage === item.image_url ? styles.active : ""}
            />
          </div>
        ))}
      </div>
  
      <Detail selectedImage={selectedImage}/>
    </div>
  );
};

export default ProductDetailImages;
