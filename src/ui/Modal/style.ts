import styled from "styled-components";
import { Modal as AntdModal } from "antd";
export const StyledModal = styled(AntdModal)`
  & {
    width: min-content !important;
    display: flex;
    justify-content: center;
  }

  .ant-modal-footer {
    display: none;
  }

  .ant-modal-content {
    width: auto;
    border-radius: 20px;
    padding: 20px;

    .ant-modal-close {
      max-width: 18px;
      max-height: 18px;
      background: none;
    }

    .modal-body {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 30px;
      padding: 20px 0px;
      flex-direction: column;

      .modal-descripion {
        width: 226px;
        text-align: center;
        width: 266px;
        font-size: var(--paragraph);
        font-weight: 400;
        line-height: 19.36px;
        white-space: pre-line;
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

      .cart_order_modal__form {
        display: flex;
        flex-direction: column;
        gap: 20px;

        .form__cooseLocation {
          cursor: pointer;  
          display: flex;
          align-items: end;
          gap: 2px;
          font-size: var(--paragraph-two);
          font-weight: 400;
          line-height: 16.94px;
          color: var(--primary-color);

          svg {
            padding: 0px 0px 0px 5px;
            transform: rotate(-90deg);
            path {
              stroke: var(--primary-color);
              stroke-width: 1px;
            }
          }
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        input {
          width: 350px;
          font-size: var(--paragraph-two);
          font-weight: 400;
          line-height: 16.94px;
          padding: 12px;
          margin: 0px;
          height: 100%;

          &::placeholder {
            color: var(--davys-grey);
          }
        }

        .ant-col-16 {
          max-width: none;
        }
        .cart_order_modal__select {
          .ant-select-selector {
            font-size: var(--paragraph-two);
            font-weight: 400;
            line-height: 16.94px;
            padding: 12px;
            height: 100%;
            text-align: left;

            .ant-select-selection-placeholder {
              color: var(--davys-grey);
            }
          }
        }

        .cart_order_modal__submitButton {
          width: 100%;
          font-size: var(--paragraph-two);
          font-weight: 400;
          line-height: 16.94px;
          padding: 12px;
          height: auto;
          background: rgba(255, 66, 0, 1);
          border-radius: 5px;
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
`;
