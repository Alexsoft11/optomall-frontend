/** @format */

import React, { useEffect, useState } from "react";
import styles from "./ProductDetailImages.module.scss";
import Image from "next/image";
import SliderSection from "../SliderSection";
import { detailData } from "@/mockdata/detailData";
import CustomImage from "@/components/CustomImage";

const isMobile = (windowWidth: number) => windowWidth > 850;

const Detail = ({ selectedImage, product }: any) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial window width
    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className={styles.detail}>
        {windowWidth !== null && isMobile(windowWidth) ? (
          <CustomImage
            src={selectedImage}
            alt=""
            className={styles.detail_image}
            imgClass={styles.img}
            isLink={false}
          />
        ) : (
          <>
            <div className={styles.imagePreview}>
              <SliderSection data={product.pictures} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Detail;
