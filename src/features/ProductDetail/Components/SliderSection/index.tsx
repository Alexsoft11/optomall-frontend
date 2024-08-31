/** @format */

import { Button, Carousel, ConfigProvider } from "antd";
import Image, { StaticImageData } from "next/image";
import React, { FC, useState } from "react";
import styles from "./SliderSection.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import SvgSelector from "$/assets/icons/SvgSelector";
import Lightbox from "react-awesome-lightbox";
import { PlayIcon } from "$/assets/images";
import ReactPlayer from "react-player";
import { Modal } from "@/ui";
interface IProps {
  data: [] | any;
  video: string;
}

const SliderSection: FC<IProps> = ({ data, video }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setIsOpen(true);
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const modalProps = {
    onCancel: () => setIsPlaying(false),
    children: (
      <ReactPlayer
        url={video}
        playing={true}
        controls
        className={styles.video_player}
      />
    ),
    open: isPlaying,
  };


  return (
    <>
      <Carousel
        swipeToSlide={true}
        draggable
        dots={true}
        dotPosition={"bottom"}
      >
        {data.map((el: any, idx: number) => (
          <div key={idx} className={styles.img_content}>
            <Image
              src={el.image_url}
              alt="Selected"
              className={styles.main_img}
              fill
            />
            <span
              className={styles.view_icon}
              onClick={() => handleImageClick(1)}
            >
              <SvgSelector id="open-image-view-svg" />
            </span>

            {!isPlaying && video ? (
              <>
                <Button onClick={handlePlay} className={styles.play_button}>
                  <Image alt="#" src={PlayIcon} width={40} height={40} />
                </Button>
              </>
            ) : null}
          </div>
        ))}
      </Carousel>
      {isOpen && (
        <Lightbox
          images={data.map((el: any) => ({ url: el.image_url }))}
          onClose={() => setIsOpen(false)}
          startIndex={currentImageIndex} // Starting index for the lightbox
          doubleClickZoom={2}
        />
      )}
      {isPlaying && <Modal {...modalProps} />}
    </>
  );
};

export default SliderSection;
