import { Spin } from "antd";
import styled from "styled-components";

export const StyledSpin = styled(Spin)`
  &.products_spin {
    height: 100px !important;
    position: relative !important;

    span {
      i {
        background-color: var(--primary-color);
      }
    }

    div {
      color: var(--primary-color);
    }
  }

  &.btn_spin {
    height: 50px !important;
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
