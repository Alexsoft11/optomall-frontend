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
import { ColorsBasketInterface, SKU, SKUProperty } from "../../interface";

interface Props {
  colors: SKUProperty[];
  skus?: SKU[];
  handleColorSelect: (colorProperty?: SKUProperty) => void;
  selectedColor?: SKUProperty;
  colorsBasket: ColorsBasketInterface[];
}

const SliderColors = ({
  colors,
  skus,
  handleColorSelect,
  selectedColor,
  colorsBasket,
}: Props) => {
  const getTotalQuantities = () => {
    const totalQuantities: { [key: string]: number } = {};
    colorsBasket.forEach((colorBasket) => {
      const totalQuantity = colorBasket.data.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      totalQuantities[colorBasket.color] = totalQuantity;
    });
    return totalQuantities;
  };

  const totalQuantities = getTotalQuantities();
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
        {colors?.map((color, idx: number) => {
          return (
            <SwiperSlide key={idx}>
              <div className={styles.card_item}>
                <Badge count={totalQuantities[color.value] || 0} />
                <div
                  className={`${styles.slide_color} ${
                    selectedColor?.value === color.value ? styles.selected : ""
                  }`}
                  onClick={() => handleColorSelect(color)}
                >
                  {color?.imageUrl && (
                    <Image
                      src={color?.imageUrl}
                      alt={color?.name ? color?.name : ""}
                      fill
                    />
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {colors.length > 5 ? (
        <>
          <button
            className={`next_btn ${styles.next_btn} ${styles.swiper_btns}`}
          >
            <SvgSelector id="next-svg" />
          </button>
          <button
            className={`prev_btn ${styles.prev_btn} ${styles.swiper_btns}`}
          >
            <SvgSelector id="prev-svg" />
          </button>
        </>
      ) : null}
    </div>
  );
};

export default SliderColors;
