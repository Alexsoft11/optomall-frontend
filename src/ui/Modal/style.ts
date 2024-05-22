import styled from "styled-components";
import { Modal as AntdModal } from 'antd';
export const StyledModal = styled(AntdModal)`

& {
    width: min-content !important;
    margin: 0px !important;
    left: 50%;
    transform: translate(-50%, 20%);
}

.ant-modal-footer {
    display: none
}

.ant-modal-content {
    border-radius: 20px;
    width: 312px;
    margin-top: 14%;
    padding: 20px;
    height: 235px;

    .modal-body {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 30px;
        padding: 20px 10px 10px  10px;
        flex-direction: column;

        p {
            width: 226px;
            text-align: center;
            width: 266px;
            font-size: 16px;
            font-weight: 400;
            line-height: 19.36px;
        }
    }

    .message-modal-img {
        border-radius: 50%;
        padding: 20px;
        display: flex;
        width: 74px;
        justify-content: center;
        align-items: center;
    }
}
`