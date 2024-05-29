import React from 'react'
import styles from './MainSlider.module.scss'
import CustomSliders from '@/Components/CustomSliders'
import { MainSliderImages } from '@/mockdata/Sliders';
import Image from 'next/image';

const MainSlider = () => {
  return (
    <>
        <div className={styles.main_slider}>
            <CustomSliders
                SliderData={MainSliderImages.map((src, idx) => (
                    <Image key={idx} src={src} alt="img" width={500} height={500} />
                ))}
                dots={true}
                arrows={true}
                timeAutoPlay={5000}
                autoPlay={true}
                slidesToShow={1}
                slidesToScroll={1}
                centered={true}
                className="home-slider"
            />
        </div>
    </>
  )
}

export default MainSlider