import { Input as AntdInput } from "antd";
import styled from "styled-components";

export const StyledInput = styled(AntdInput)`

    &.search_input {
        height: 35px;
        
        border: none;
        background: none;
        outline: none;
        
        padding-left: 5px;
        padding-right: 10px;

        &:focus {
            border: none;
            background: none;
            outline: none; 
            box-shadow: none;
        }
    }
`;
