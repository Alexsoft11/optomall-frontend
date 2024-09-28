/** @format */

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css";

import styles from "./ProductDetailImages.module.scss";
import Detail from "./detail";
import { ProductDetailInterface } from "../../interface";
import CustomImage from "@/components/CustomImage";
import { Mousewheel, Navigation } from "swiper/modules";
import Lightbox from "react-awesome-lightbox";
import SvgSelector from "$/assets/icons/SvgSelector";

interface Props {
  selectedImage: any;
  setSelectedImage: any;
  product: ProductDetailInterface;
}

const ProductDetailImages = ({
  selectedImage,
  setSelectedImage,
  product,
}: Props) => {
  const [imageIndex, setImageIndex] = useState(1)


  return (
    <div className={styles.productDetail}>
      <Swiper
        direction="vertical"
        slidesPerView={6}
        spaceBetween={10}
        mousewheel={true}
        modules={[Mousewheel]}
        className={styles.imageThumbnails}
      >
        {product.pictures.map((item: any, idx: number) => (
          <SwiperSlide key={item.id} className={styles.imageThumbnails_card}>
            <>
              <CustomImage
                fill
                src={item.image_url}
                alt={`Thumbnail ${item.id}`}
                onClick={() => {
                  setImageIndex(idx)
                  setSelectedImage(item.image_url)
                }}
                loading="lazy"
                isLink={false}
                className={
                  selectedImage === item.image_url ? styles.active : ""
                }
              />
            </>
          </SwiperSlide>
        ))}
      </Swiper>

      <Detail imageIndex={imageIndex} selectedImage={selectedImage} product={product} />

    </div>
  );
};

export default ProductDetailImages;
