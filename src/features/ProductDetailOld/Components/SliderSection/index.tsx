/** @format */

import { Carousel, ConfigProvider } from "antd";
import Image, { StaticImageData } from "next/image";
import React, { FC } from "react";
import styles from "./SliderSection.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
interface IProps {
  data: [] | any;
}

const SliderSection: FC<IProps> = ({ data }) => {
  const contentStyle: React.CSSProperties = {
    height: "160px",
    width: "200px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    zIndex: 200,
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
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default SliderSection;
