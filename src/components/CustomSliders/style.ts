import styled from "styled-components";
import { Carousel } from "antd";

export const StyledCustomSlider = styled(Carousel)`
&.home-slider {
    .slick-track {
      display: flex;
      align-items: center;
      gap: 40px;
      z-index: -1 !important;
      @media (max-width:1500px) {
        gap: 20px;
      }
    }
  }
`;
