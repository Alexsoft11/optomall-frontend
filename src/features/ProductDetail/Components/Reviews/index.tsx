import { reviews } from '@/mockdata/detailData'
import { Button, Rate } from 'antd'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from "./Reviews.module.scss"
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import SvgSelector from '$/assets/icons/SvgSelector'
const Reviews = () => {
  return (
    <div  className={styles.reviews}>
      <div className={styles.navigators}>
          <button className={`prev_btn_reviews ${styles.prev_btn} ${styles.swiper_btns}`}>
        <SvgSelector id='prev-svg' />
      </button>
        <button className={`next_btn_reviews ${styles.next_btn} ${styles.swiper_btns}`}>
        <SvgSelector id='next-svg' />
      </button>
      </div>
    
      <Swiper
        spaceBetween={20}
        slidesPerView={1.3}
        loop={true}
        navigation={{
          nextEl: `.next_btn_reviews`,
          prevEl: `.prev_btn_reviews`,
        }}
        breakpoints={{
          960: {
            slidesPerView: 3,
          },
          390: {
            slidesPerView: 2,
          }
        }}
        pagination={{ clickable: true }}
        modules={[Navigation]}
      >
        {reviews.map((review:any, index:number) => (
          <SwiperSlide key={index}>
            <div className="review-card">
              <h3>{review.name}</h3>
              <p>{review.date}</p>
              <Rate disabled defaultValue={review.rating} />
              <p>{review.text}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Reviews