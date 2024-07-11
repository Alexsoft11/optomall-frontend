/** @format */

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import styles from "./SliderColors.module.scss";
import SvgSelector from "$/assets/icons/SvgSelector";
import { Badge } from "antd";

const SliderColors = ({
  data,
  setSelectedColor,
  totalQuantities,
  selectedColors,
  setSelectedColors,
}: any) => {
  const [activeItem, setActiveItem] = useState<number>(data[0].id);

  const handleColorClick = (colorId: number) => {
    setActiveItem(colorId);
    setSelectedColors((prev: number[]) => {
      if (!prev.includes(colorId)) {
        return [...prev, colorId];
      }
      return prev;
    });
    setSelectedColor(colorId);
  };

  return (
    <div className={styles.swiper_colors}>
      <Swiper
        loop={true}
        slidesPerView={4}
        spaceBetween={5}
        navigation={{
          nextEl: `.next_btn`,
          prevEl: `.prev_btn`,
        }}
        breakpoints={{
          960: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          460: {
            slidesPerView: 5.2,
            spaceBetween: 10,
          },
          350: {
            slidesPerView: 5,
            spaceBetween: 5,
          },
        }}
        modules={[Navigation]}
        className="slider_colors"
      >
        {data?.map((el: any, idx: number) => (
          <SwiperSlide key={idx}>
            <div className={styles.card_item}>
              <Badge count={totalQuantities[el.id] || 0}></Badge>
              <div
                className={`${styles.slide_color} ${
                  activeItem === el.id ? styles.selected : ""
                }`}
                onClick={() => handleColorClick(el.id)}
              >
                <Image src={el.image_url} alt={el.name} fill />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className={`next_btn ${styles.next_btn} ${styles.swiper_btns}`}>
        <SvgSelector id="next-svg" />
      </button>
      <button className={`prev_btn ${styles.prev_btn} ${styles.swiper_btns}`}>
        <SvgSelector id="prev-svg" />
      </button>
    </div>
  );
};

export default SliderColors;
