/** @format */

import { Button, Rate } from "antd";
import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Reviews.module.scss";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import SvgSelector from "$/assets/icons/SvgSelector";
import { IProductComments } from "../../interface";

interface IProps {
  comments: IProductComments[];
}
const Reviews: FC<IProps> = ({ comments }) => {
  return (
    <>
      {comments ? (
        <div className={styles.reviews}>
          <h3 className={styles.title}>Отзывы</h3>
          <div className={styles.navigators}>
            <button
              className={`prev_btn_reviews ${styles.prev_btn} ${styles.swiper_btns}`}>
              <SvgSelector id='prev-svg' />
            </button>
            <button
              className={`next_btn_reviews ${styles.next_btn} ${styles.swiper_btns}`}>
              <SvgSelector id='next-svg' />
            </button>
          </div>

          <Swiper
            spaceBetween={20}
            slidesPerView={1.1}
            loop={true}
            navigation={{
              nextEl: `.next_btn_reviews`,
              prevEl: `.prev_btn_reviews`,
            }}
            breakpoints={{
              960: {
                slidesPerView: 3,
              },
              480: {
                slidesPerView: 2,
              },
              380: {
                slidesPerView: 1.3,
              },
            }}
            pagination={{ clickable: true }}
            modules={[Navigation]}>
            {comments?.map((review: IProductComments, index: number) => (
              <SwiperSlide key={index} className={styles.stars}>
                <div className={styles.review_card}>
                  <div className={styles.card_info}>
                    <div>
                      <p className={styles.card_info_title}>
                        {review.user_name}
                      </p>
                      <p className={styles.card_info_date}>
                        {review.created_at}
                      </p>
                    </div>
                    <Rate
                      disabled
                      defaultValue={review.rating}
                      className={styles.stars}
                    />
                  </div>
                  <p>{review.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : null}
    </>
  );
};

export default Reviews;
