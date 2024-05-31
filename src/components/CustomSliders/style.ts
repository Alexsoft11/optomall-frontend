import styled from "styled-components";
import { Carousel } from "antd";

export const StyledCustomSlider = styled(Carousel)`
margin-top: 90px;
  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    div {
      min-height: 550px;
      width: 100%;
      height: 100%;
    }

    img {
      width: 100%;
      min-height: 550px;
      border-radius: 20px;
    }
  }

  .slick-slide img {
    max-width: 100%;
    max-height: 100%;
  }

  .slick-track {
    display: flex;
    align-self: center;
    gap: 30px;
  }
`;
