import React from 'react'
import styles from './MainSlider.module.scss'
import SearchBtn from '@/components/SearchBtn';
import MainSliderCard from '../MainSliderCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import { SlidersDataInterface } from '@/interfaces';
import { MainSliderImages } from '@/mockdata/Sliders';

interface Props {
  data: SlidersDataInterface[];
}

const MainSlider: React.FC<Props> = ({ data }) => {
  return (
    <>
      <div className={styles.mainbanner}>
        <div className='container'>
          <div className={styles.mainbanner__inner}>
            <SearchBtn/>
          </div>
        </div>

        <div className={styles.main_slider}>
          <Swiper
            slidesPerView={1.1}
            spaceBetween={10}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 1.15,
                spaceBetween: 20,
                centeredSlides: true
              },
              390: {
                slidesPerView: 1.2,
                spaceBetween: 10,
                centeredSlides: true
              }
            }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            loop={true}
            navigation={{
              nextEl: `.next-btn`,
              prevEl: `.prev-btn`,
            }}
            modules={[Pagination, Autoplay, Navigation]}
            className={`${styles.my_swiper} main-swiper`}
          >
            {data?.map((el: any, idx) => (
              <SwiperSlide key={idx} className={styles.swiper}>
                <MainSliderCard el={el} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  )
}

export default MainSlider