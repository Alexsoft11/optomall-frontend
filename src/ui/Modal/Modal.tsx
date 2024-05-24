import { Modal as AntdModal } from 'antd';
import Image, { StaticImageData } from 'next/image';
import { useEffect } from 'react';
import { StyledModal } from './style';

export interface ModalProps {
  title?: string;
  children?: React.ReactNode;
  open: boolean;
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
  onCancel: React.Dispatch<React.SetStateAction<boolean>>
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
  className?: string;
  img?: StaticImageData;
  description?: string;
  bgColor: string;
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
  img,
  className,
  description,
  bgColor,
}: ModalProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  return (
    <StyledModal
      title={title}
      open={open}
      onOk={onOk}
      onCancel={() => onCancel(false)}
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
      className={className}
    >
      <p></p>
      <div className='modal-body'>
        {img ? (
          <div style={{background: bgColor}} className='message-modal-img'>
            <Image src={img} width={34} height={34} alt='#' />
          </div>
        ) : null}

        <p>
          {description}
        </p>
      </div>
      {children}
    </StyledModal>
  );
};
