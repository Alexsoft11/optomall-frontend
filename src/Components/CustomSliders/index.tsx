import React from "react";
import { StyledCustomSlider } from "./style";

interface SliderProps {
  SliderData: React.JSX.Element[];
  dots?: boolean;
  arrows?: boolean;
  autoPlay?: boolean;
  timeAutoPlay?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
  centered?: boolean;
  className?: string;
}

const CustomSliders = ({
  SliderData,
  dots = true,
  arrows = true,
  timeAutoPlay = 3000,
  autoPlay = true,
  slidesToShow = 1,
  slidesToScroll = 1,
  centered = false,
  className,
}: SliderProps) => {
  return (
    <StyledCustomSlider
      arrows={arrows}
      dotPosition="bottom"
      autoplaySpeed={timeAutoPlay}
      className={className}
      swipeToSlide={true}
      autoplay={autoPlay}
      dots={dots}
      draggable
      pauseOnHover={true}
      slidesToShow={slidesToShow}
      slidesToScroll={slidesToScroll}
      centerMode={centered}
    >
      {SliderData?.map((el, index) => (
        <div key={index}>{el}</div>
      ))}
    </StyledCustomSlider>
  );
};

export default CustomSliders;
