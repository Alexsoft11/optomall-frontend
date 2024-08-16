/** @format */

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css";

import styles from "./ProductDetailImages.module.scss";
import Detail from "./detail";
import { ProductDetailInterface } from "../../interface";
import CustomImage from "@/components/CustomImage";
import { Mousewheel, Navigation } from "swiper/modules";

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
            <CustomImage
              fill
              src={item.image_url}
              alt={`Thumbnail ${item.id}`}
              onClick={() => setSelectedImage(item.image_url)}
              loading="lazy"
              isLink={false}
              className={selectedImage === item.image_url ? styles.active : ""}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Detail selectedImage={selectedImage} product={product} />
      {/* <div className={styles.productDetail__inner_image}></div> */}
    </div>
  );
};

export default ProductDetailImages;
