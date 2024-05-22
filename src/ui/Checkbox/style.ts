import { Checkbox } from "antd";
import styled from "styled-components";

export const StyledChackbox = styled(Checkbox)`
& {
    .ant-checkbox-inner {
        background: #d9d9d9;
        width: 20px;
        height: 20px;

        &:after {
            inset-inline-start: 29.8%;
        }
    }
    .ant-checkbox-checked {
        .ant-checkbox-inner {
            background: #1677ff;
        }
    }


}
`