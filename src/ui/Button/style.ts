import styled from 'styled-components';
import { Button as AntdButton } from "antd";

export const StyledButton = styled(AntdButton)`

.headbtn {
    transition: all 0.2s ease-in-out;
    border: none;
  
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
      min-width: 38px;
      min-height: 38px;
      padding: 0;
    }
  
    &.round {
      border-radius: 10px;
    }
  
    &.large {
      min-height: 56px;
  
      span {
        font-size: 1rem;
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
        font-size: 14px;
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
        font-size: 0.75rem;
        font-weight: 400;
        line-height: 1rem;
        letter-spacing: 0.2px;
        text-align: center;
      }
    }
}
`;
