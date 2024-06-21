import { Spin } from 'antd';
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
`