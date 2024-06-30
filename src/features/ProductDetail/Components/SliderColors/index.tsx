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
  selectedColor,
  totalQuantities,
  selectedColors,
  setSelectedColors
}: any) => {
  const handleColorClick = (colorId: number) => {
    if (selectedColors.includes(colorId)) {
      setSelectedColors((prev: number[]) => prev.filter(id => id !== colorId));
    } else {
      setSelectedColors((prev: number[]) => [...prev, colorId]);
    }
    setSelectedColor(colorId);
  };
  console.log(selectedColors)
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
        className='slider_colors'>
        {data?.map((el: any, idx: number) => (
          <SwiperSlide key={idx}>
            <Badge count={totalQuantities[el.id] || 0}>
              </Badge>
              <div
                className={`${styles.slide_color} ${selectedColors.includes(el.id)? styles.selected : ""}`}
                onClick={() => handleColorClick(el.id)}>
                <Image src={el.image_url} alt={el.name} fill />
              </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className={`next_btn ${styles.next_btn} ${styles.swiper_btns}`}>к
        <SvgSelector id='next-svg' />
      </button>
      <button className={`prev_btn ${styles.prev_btn} ${styles.swiper_btns}`}>
        <SvgSelector id='prev-svg' />
      </button>
    </div>
  );
};

export default SliderColors;