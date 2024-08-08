/** @format */

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import styles from "./SliderColors.module.scss";
import SvgSelector from "$/assets/icons/SvgSelector";
import { Badge, Tooltip } from "antd";
import { ColorsBasketInterface, SKU, SKUProperty } from "../../interface";
import CustomImage from "@/components/CustomImage";

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

  const renderColorItem = (
    color: SKUProperty,
    idx: number,
    className: string
  ) => (
    <div className={styles.card_item} key={idx}>
      <Tooltip
        title={color?.imageUrl ? color.value : ""}
        trigger={["contextMenu", "hover"]}
      >
        <Badge offset={[-2, -2]} count={totalQuantities[color.value] || 0}>
          <div
            className={`${className} ${
              selectedColor?.value === color.value ? styles.selected : ""
            }`}
            onClick={() => handleColorSelect(color)}
          >
            {color?.imageUrl ? (
              <CustomImage
                src={color?.imageUrl}
                alt={color?.name ? color?.name : ""}
                fill={true}
                isLink={false}
                loading="lazy"
              />
            ) : (
              <div className={styles.color_value}>
                {color.value.length > 25 ? (
                  <Tooltip
                    title={color.value}
                    trigger={["hover", "contextMenu"]}
                  >
                    {color.value.slice(0, 20)}...
                  </Tooltip>
                ) : (
                  color.value
                )}
              </div>
            )}
          </div>
        </Badge>
      </Tooltip>
    </div>
  );

  // Check if the first imageUrl is null
  const isImageUrlNull = colors.length > 0 && !colors[0].imageUrl;

  return (
    <div className="">
      {isImageUrlNull ? (
        // Render simple list if imageUrl is null
        <div className={styles.color_list}>
          {colors.map((color, idx: number) =>
            renderColorItem(
              { ...color, imageUrl: undefined },
              idx,
              styles.list_item
            )
          )}
        </div>
      ) : (
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
            {colors.map((color, idx: number) => {
              return (
                <SwiperSlide key={idx}>
                  {renderColorItem(color, idx, styles.slide_color)}
                </SwiperSlide>
              );
            })}
          </Swiper>
          {colors.length > 5 && (
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
          )}
        </div>
      )}
    </div>
  );
};

export default SliderColors;
