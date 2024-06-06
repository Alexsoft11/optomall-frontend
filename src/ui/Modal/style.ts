import styled from "styled-components";
import { Modal as AntdModal } from 'antd';
export const StyledModal = styled(AntdModal)`

& {
    width: min-content !important;
    display: flex;
    justify-content: center;
}

.ant-modal-footer {
    display: none
}

.ant-modal-content {

    border-radius: 20px;
    width: 312px;
    margin-top: 14%;
    padding: 20px;
    height: auto;
    

    .modal-body {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 30px;
        padding: 20px 10px 10px  10px;
        flex-direction: column;

        .modal-descripion {
            width: 226px;
            text-align: center;
            width: 266px;
            font-size: var(--paragraph);
            font-weight: 400;
            line-height: 19.36px;
        }

        .message-modal-success {

            .confirmButton {
                 button {
                    width: 100%;
                    font-size: var(--paragraph-two);
                    font-weight: 400;
                    line-height: 16.94px;
                    padding: 12px;
                    height: auto;
                    background: rgba(255, 66, 0, 1);
                    border-radius: 10px;
                }
            }

            display: flex;
            flex-direction: column;
            gap: 10px;

            h2 {
                font-size: var(--heading-six);
                font-weight: 500;
                line-height: 24.2px;
            }

            .message-modal-text_block {
                display: flex;
                flex-direction: column;
                text-align: center; 
                gap: 5px;
                padding: 0px 0px 10px 0px;

                .message-modal-paragraph {
                    color: var(--silver-grey);
                    font-size: var(--paragraph-three);
                    font-weight: 400;
                    line-height: 14.52px;
                }

                .message-modal-text {
                    font-size: var(--paragraph-two);
                    font-weight: 400;
                    line-height: 16.94px;
                }
            }

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

    .bg_green {
        background: var(--emerald-green);
    }

    .bg_red {
        background: var(--primary-color);
    }

    .bg_white {
        background: var(--light-white);
    }
}
`