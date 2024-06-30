import { Carousel } from "antd";
import Image, { StaticImageData } from "next/image";
import React, { FC } from "react";
import styles from "./SliderSection.module.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
interface IProps {
  data: [] |any;
}

const SliderSection: FC<IProps> = ({ data }) => {
    const imagePath = data.image_url ? data.image_url : ""
  return (
    <>  
<Swiper pagination={true} modules={[Pagination]} className="Myswiper">
       {data.map((el:any)=>(
            <SwiperSlide>
                <div className={styles.imagePreview}>
                    <Image src={imagePath} alt="#frefr" fill/>
                </div>
            </SwiperSlide>
       ))}
      </Swiper>
    </>
  );
};

export default SliderSection;
