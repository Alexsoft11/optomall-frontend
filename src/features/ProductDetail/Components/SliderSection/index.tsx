/** @format */

import { Carousel, ConfigProvider } from "antd";
import Image, { StaticImageData } from "next/image";
import React, { FC, useState } from "react";
import styles from "./SliderSection.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import SvgSelector from "$/assets/icons/SvgSelector";
import Lightbox from "react-awesome-lightbox";
interface IProps {
  data: [] | any;
}

const SliderSection: FC<IProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <Carousel
        swipeToSlide={true}
        draggable
        dots={true}
        dotPosition={"bottom"}
      >
        {data.map((el: any, idx: number) => (
          <div key={idx} className={styles.img_content}>
            <Image src={el.image_url} alt="Selected" fill />
            <span
              className={styles.view_icon}
              onClick={() => handleImageClick(1)}
            >
              <SvgSelector id="open-image-view-svg" />
            </span>
          </div>
        ))}
      </Carousel>
      {isOpen && (
        <Lightbox
          images={data.map((el: any) => ({ url: el.image_url }))}
          onClose={() => setIsOpen(false)}
          startIndex={currentImageIndex} // Starting index for the lightbox
          doubleClickZoom={2}
        />
      )}
    </>
  );
};

export default SliderSection;
