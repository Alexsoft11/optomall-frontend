import { Input as AntdInput } from "antd";
import styled from "styled-components";

export const StyledInput = styled(AntdInput)`
  &.ant-input-affix-wrapper {
    flex-direction: row-reverse;
   
    &:hover {
      border: var(--primary-color) 1px solid;
      background: var(--white-smoke);
    }
    &:focus {
      border: none;
      background: none;
      outline: none;
      box-shadow: none;
    }
    &.ant-input-outlined:focus-within {
      border: var(--primary-color) 1px solid;
      background: none;
      outline: none;
      box-shadow: none;
    }
    .ant-input-suffix {
      padding-right: 5px;
    }
  }
`;
