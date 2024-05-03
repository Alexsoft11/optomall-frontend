import { Modal as AntdModal } from 'antd';
import { useEffect } from 'react';

export interface ModalProps {
  title?: string;
  children?: React.ReactNode;
  open: boolean;
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  okText?: string;
  cancelText?: string;
  zIndex?: number;
  wrapClassName?: string;
  width?: number | string;
  footer?: React.ReactNode;
  forceRender?: any;
  getContainer?: string | false | HTMLElement | undefined;
  destroyOnClose?: boolean;
  centered?: boolean;
}

export const Modal = ({
  title,
  children,
  open,
  onOk,
  onCancel,
  okText,
  cancelText,
  zIndex = 2050,
  wrapClassName,
  width = 1000,
  footer,
  forceRender,
  getContainer,
  destroyOnClose,
  centered,
}: ModalProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  return (
    <AntdModal
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      zIndex={zIndex}
      wrapClassName={wrapClassName}
      width={width}
      footer={footer}
      forceRender={forceRender}
      getContainer={getContainer}
      destroyOnClose={destroyOnClose}
      centered={centered}
    >
      {children}
    </AntdModal>
  );
};
