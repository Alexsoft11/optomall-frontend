import styled from 'styled-components';
import { Button } from "antd";

export const StyledButton = styled(Button)`
    transition: all 0.2s ease-in-out;
    border: none;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:hover {
      background: #FF4200 !important;
    }
  
    svg {
      min-width: 24px;
      min-height: 24px;
      max-width: 24px;
      max-height: 24px;
    }
  
    div {
      display: none;
    }
  
    &.circle {
      border-radius: 100%;
      max-width: 38px;
      max-height: 38px;
      min-width: 38px !important;
      min-height: 38px;
      padding: 0;
    }
  
    &.round {
      border-radius: 10px;
    }
  
    &.large {
      min-height: 56px;
  
      span {
        font-size: var(--paragraph);
        font-weight: 600;
        line-height: 1.5rem;
        letter-spacing: 0.2px;
        text-align: center;
      }
    }
  
    &.middle {
      min-height: 41px;
      height: 100%;
      max-height: 100%;
      display: none;
  
      span {
        font-size: var(--paragraph-two);
        font-weight: 400;
        line-height: 1.0588rem;
        letter-spacing: 0.2px;
        text-align: center;
      }
    }
  
    &.small {
      width: 100%;
      min-height: 32px;
      max-width: fit-content;
  
      span {
        font-size: var(--paragraph-three);
        font-weight: 400;
        line-height: 1rem;
        letter-spacing: 0.2px;
        text-align: center;
      }
    }

    &.headbtn {
      padding: 3px 8px;
      border-radius: 10px;
      line-height: 1.25;
      background: #FF4200;
      display: flex;
      align-items: center;
      justify-content: center;
      height: auto;
      width: 66px;

      span {
        color: #FFF;
        font-size: var(--paragraph-three);
        font-weight: 300;
      }


      position: relative;
      transition: background-color .6s ease;
      overflow: hidden;
      &:after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        top: 50%;
        left: 50%;
        top: var(--mouse-y);
        left: var(--mouse-x);
        transform-style: flat;
        transform: translate3d(-50%,-50%,0);
        background: rgba(255, 255, 255, 0.1);
        border-radius: 100%;
        transition: width .3s ease, height .3s ease;
      }
      &:focus,
      &:hover {
          background: darken(#FC6E51,7%);
      }
      &:active {
        &:after {
          width: 300px;
          height: 300px;
        }
      }
    }

    &.generalbtn {
      min-width: 100%;
      line-height: 1.25;
      background: #FF4200;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
          text-decoration: none;
          color: white;
          font-size: var(--paragraph-two);
          letter-spacing: .08em;
      }


      position: relative;
      transition: background-color .6s ease;
      overflow: hidden;
      &:after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        top: 50%;
        left: 50%;
        top: var(--mouse-y);
        left: var(--mouse-x);
        transform-style: flat;
        transform: translate3d(-50%,-50%,0);
        background: rgba(255, 255, 255, 0.1);
        border-radius: 100%;
        transition: width .3s ease, height .3s ease;
      }
      &:focus,
      &:hover {
          background: darken(#FC6E51,7%);
      }
      &:active {
        &:after {
          width: 300px;
          height: 300px;
        }
      }
    }

    &.line_btn {
      min-width: 100%;
      line-height: 1.25;
      background: var(--white-color);
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--primary-color);
      border-radius: 10px;

      span {
        text-decoration: none;
        color: var(--primary-color);
        font-size: var(--paragraph-two);
        letter-spacing: .08em;
      }

      &:hover {
        background: var(--white-color) !important;
        border: 1px solid var(--primary-color) !important;
      }
    }
`;
