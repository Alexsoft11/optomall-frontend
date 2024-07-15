import { Spin } from "antd";
import styled from "styled-components";

export const StyledSpin = styled(Spin)`
  &.global {
    height: 100px !important;
    position: relative !important;

    span {
      i {
        background-color: var(--primary-color);
      }
    }

    .ant-spin-text {
      color: var(--primary-color);
    }
  }

  &.btn_spin {
    height: 18px !important;
    position: relative !important;

    span {
      i {
        background-color: var(--white-color);
      }
    }

    div {
      color: var(--white-color);
    }

    .ant-spin-dot {
      margin-top: -15px !important;
      width: 28px;
      height: 28px;
    }

    .ant-spin-text {
      display: none;
    }
  }
`;
