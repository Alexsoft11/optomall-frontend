import React, { useEffect, useState } from "react";
import styles from "./ProductDetailImages.module.scss";
import ReactPlayer from "react-player";
import CustomImage from "@/components/CustomImage";
import Lightbox from "react-awesome-lightbox";
import { Button } from "antd";
import SliderSection from "../SliderSection";
import Image from "next/image";
import { CloseIcon, PlayIcon } from "$/assets/images";
import { Modal } from "@/ui";

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

  const modalProps = {
    onCancel: () => setIsPlaying(false),
    children: (
      <ReactPlayer
        url={product?.videos?.[0]?.Url || product.videos.url}
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
            />
            {(!isPlaying && product.videos[0]) || product.videos.url ? (
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
              <SliderSection
                video={product?.videos?.[0]?.Url || product.videos.url || ""}
                data={product.pictures}
              />
            </div>
          </>
        )}
      </div>
      {isOpen && (
        <Lightbox
          images={images.map((img: string) => ({ url: img }))}
          onClose={() => setIsOpen(false)}
          startIndex={currentImageIndex}
          doubleClickZoom={2}
        />
      )}
      {isPlaying && product.videos[0]?.Url || product.videos ? <Modal {...modalProps} /> : null}
    </>
  );
};

export default Detail;
