import React, { useEffect, useState } from 'react'
import styles from "./ProductDetailImages.module.scss";
import Image from 'next/image';
import SliderSection from '../SliderSection';
import { detailData } from '@/mockdata/detailData';


const isMobile =(windowWidth:number) =>  windowWidth > 560 

 const Detail = ({selectedImage}:any) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

      console.log(window.innerWidth);
      

    return isMobile(windowWidth) ? (
        <div className={styles.imagePreview}>
          <Image src={selectedImage} alt='Selected' fill/>
          
        </div>
      ) : (
        <>
            <SliderSection data={detailData}/>
        </>
      )
}

export default Detail
