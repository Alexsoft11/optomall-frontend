import React, { useEffect, useMemo, useState } from "react";
import styles from "./ProductDetailImages.module.scss";
import ReactPlayer from "react-player";
import CustomImage from "@/components/CustomImage";
import { Button } from "antd";
import SliderSection from "../SliderSection";
import Image from "next/image";
import { CloseIcon, PlayIcon } from "$/assets/images";
import { Modal } from "@/ui";
import LightboxGallery from "../LightboxGallery";

const isMobile = (windowWidth: number) => windowWidth > 850;

const Detail = ({ selectedImage, product, imageIndex }: any) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const images = [
    selectedImage,
    ...product.pictures.map((p: any) => p.image_url),
  ];

  const handleImageClick = () => {
    setCurrentImageIndex(imageIndex);
    setIsOpen(true);
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const getVideoUrl = () => {
    const video = product.videos;
    if (!video) return ''
    switch (typeof video) {
      case "string":
        return video;
        break;
      case "object":
        if (Array.isArray(video) && video.length) {
          if (video[0].Url) return video[0].Url;
          return video[0];
        } else if (video.Url) return video.Url;
        break;

      default:
        return "";
        break;
    }
  };

  const modalProps = {
    onCancel: () => setIsPlaying(false),
    children: (
      <ReactPlayer
        url={getVideoUrl()}
        playing={true}
        controls
        className={styles.video_player}
      />
    ),
    open: isPlaying,
  };

  return (
    <>
      <div className={styles.detail}>
        {windowWidth !== null && isMobile(windowWidth) ? (
          <div className={styles.image_block}>
            <CustomImage
              src={selectedImage}
              alt="Product Image"
              className={styles.detail_image}
              imgClass={styles.img}
              isLink={false}
              loading="lazy"
              onClick={() => handleImageClick()}
              useProxy={true}
            />
            {!isPlaying && getVideoUrl() ? (
              <>
                <Button onClick={handlePlay} className={styles.play_button}>
                  <Image alt="#" src={PlayIcon} width={40} height={40} />
                </Button>
              </>
            ) : null}
          </div>
        ) : (
          <>
            <div className={styles.imagePreviews}>
              <SliderSection video={getVideoUrl()} data={product.pictures} />
            </div>
          </>
        )}
      </div>
      {/* {isOpen && (
        <Lightbox
          images={images.map((img: string) => ({ url: img }))}
          onClose={() => setIsOpen(false)}
          startIndex={currentImageIndex}
          doubleClickZoom={2}
        />
      )} */}
      <LightboxGallery images={images} startIndex={currentImageIndex} setIsOpen={setIsOpen} isOpen={isOpen} />
      {isPlaying && getVideoUrl() ? <Modal {...modalProps} /> : null}
    </>
  );
};

export default Detail;
