import React from "react";
import { Carousel } from "antd";
import styles from "./CustomSliders.module.scss";

interface SliderProps {
  SliderData: React.JSX.Element[];
  dots?: boolean;
  arrows?: boolean;
  autoPlay?: boolean;
  timeAutoPlay?: number;
}

const CustomSliders = ({
  SliderData,
  dots,
  arrows,
  timeAutoPlay,
  autoPlay,
}: SliderProps) => {
  return (
    <div>
      <Carousel
        arrows={arrows}
        waitForAnimate={true}
        dotPosition="bottom"
        autoplaySpeed={timeAutoPlay}
        className={styles.customStyles}
        swipeToSlide={true}
        autoplay={autoPlay}
        dots={dots}
        draggable
        pauseOnHover={false}
      >
        {SliderData?.map((el, index) => (
          <div key={index}>{el}</div>
        ))}
      </Carousel>
    </div>
  );
};

export default CustomSliders;
