import React from 'react'
import styles from './MainSlider.module.scss'
import CustomSliders from '@/components/CustomSliders'
import { MainSliderImages } from '@/mockdata/Sliders';
import Image from 'next/image';
import SearchBtn from '@/components/SearchBtn';
import Link from 'next/link';

const MainSlider = () => {
  const SliderDataImages = () => 
    MainSliderImages.map((el, idx) => (
      <div key={idx} className={styles.slider_image}>
        <Link href="/">
            <Image src={el} alt='img'/>
        </Link>
      </div>
    ));
  
  return (
    <>
      <div className={styles.mainbanner}>
        <div className='container'>
          <div className={styles.mainbanner__inner}>
            <SearchBtn/>
          </div>
        </div>

        <div className={styles.main_slider}>
            <CustomSliders
              SliderData={SliderDataImages()}
              dots={true}
              arrows={true}
              timeAutoPlay={5000}
              autoPlay={false}
              slidesToShow={1}
              slidesToScroll={1}
              centered={true}
              className="home-slider"
            />
        </div>
      </div>
    </>
  )
}

export default MainSlider