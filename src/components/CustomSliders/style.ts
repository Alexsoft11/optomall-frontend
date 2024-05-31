import styled from "styled-components";
import { Carousel } from "antd";

export const StyledCustomSlider = styled(Carousel)`
  &.home-slider {
    .slick-list {
      
      .slick-track {
        display: flex;
        align-items: center;
        gap: 30px;

        @media (max-width: 768px) {
          gap: 10px;
        }

        .slick-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;

          div {
            width: 100%;
            height: 100%;
            max-height: 700px;
            min-height: 700px;
            outline: none;

            @media (min-width: 2000px) {
              min-height: auto;
            }

            @media (max-width: 1600px) {
              max-height: 550px;
              min-height: auto;
            }

            @media (max-width: 1130px) {
              max-height: 450px;
            }

            @media (max-width: 920px) {
              max-height: 400px;
            }

            @media (max-width: 768px) {
              max-height: 300px;
              min-height: 300px;
            }

            @media (max-width: 580px) {
              min-height: 250px;
            }

            @media (max-width: 490px) {
              min-width: 300px;
            }

            img {
              border-radius: 20px;
              width: 100%;
              min-height: 100%;
              max-height: inherit;

              @media (min-width: 768px) {
                height: 100%;
              }

              @media (max-width: 768px) {
                max-height: 300px;
                min-height: 300px;
              }

              @media (max-width: 580px) {
                min-height: 250px;
                height: inherit;
              }

              @media (max-width: 490px) {
                min-width: 100%;
              }
            }
          }
        }
      }
    }
  }
`;
