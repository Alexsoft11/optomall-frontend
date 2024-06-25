/** @format */

import React, { useEffect, useState } from "react";
import styles from "./ProductDetailImages.module.scss";
import Image from "next/image";
import dynamic from "next/dynamic";
import { detailData } from "@/mockdata/detailData";

const Detail = dynamic(() => import("./detail"),{ssr:false})

const ProductDetailImages = ({ selectedImage, setSelectedImage }: any) => {
  return (  
  <div className={styles.productDetail}>
      <div className={styles.imageThumbnails}>
        {detailData.map((item: any) => (
          <div className={styles.imageThumbnails_card}>
            <Image
              key={item.id}
              src={item.image}
              alt={`Thumbnail ${item.id}`}
              onClick={() => setSelectedImage(item.image)}
              className={selectedImage === item.img ? styles.active : ""}
            />
            <div className={styles.stick}></div>
          </div>
        ))}
      </div>
  
      <Detail selectedImage={selectedImage}/>
    </div>
  );
};

export default ProductDetailImages;
