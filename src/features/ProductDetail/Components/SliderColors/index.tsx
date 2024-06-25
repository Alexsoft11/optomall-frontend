/** @format */

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { detailData } from "@/mockdata/detailData";
import styles from "./SliderColors.module.scss";
import SvgSelector from "$/assets/icons/SvgSelector";

const SliderColors = () => {
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
   {detailData.map((el, idx) => (
  <SwiperSlide key={idx}>
    <div className={`${styles.slide_color} ${!el.status ? styles.inactive : ''}`}>
      <Image src={el.image} alt='#frefr' />
      {!el.status && <div className={styles.stick}></div>}
    </div>
  </SwiperSlide>
))}
      </Swiper>
      <button className={`next_btn ${styles.next_btn} ${styles.swiper_btns}`}>
        <SvgSelector id='next-svg' />
      </button>
      <button className={`prev_btn ${styles.prev_btn} ${styles.swiper_btns}`}>
        <SvgSelector id='prev-svg' />
      </button>
    </div>
  );
};

export default SliderColors;
