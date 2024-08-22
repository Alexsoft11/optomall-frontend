/** @format */

import React, { useEffect, useState } from "react";
import styles from "./ProductDetailImages.module.scss";
import Image from "next/image";
import SliderSection from "../SliderSection";
import CustomImage from "@/components/CustomImage";
import Lightbox from "react-awesome-lightbox";

const isMobile = (windowWidth: number) => windowWidth > 850;

const Detail = ({ selectedImage, product }: any) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

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

  const images = [
    selectedImage,
    ...product.pictures.map((p: any) => p.image_url),
  ];

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <div className={styles.detail}>
        {windowWidth !== null && isMobile(windowWidth) ? (
          <CustomImage
            src={selectedImage}
            alt="Product Image"
            className={styles.detail_image}
            imgClass={styles.img}
            isLink={false}
            loading="lazy"
            onClick={() => handleImageClick(1)}
          />
        ) : (
          <>
            <div className={styles.imagePreviews}>
              <SliderSection data={product.pictures} />
            </div>
          </>
        )}
      </div>
      {isOpen && (
        <Lightbox
          images={images.map((img: string) => ({ url: img }))}
          onClose={() => setIsOpen(false)}
          startIndex={currentImageIndex} // Starting index for the lightbox
          doubleClickZoom={2}
        />
      )}
    </>
  );
};

export default Detail;
