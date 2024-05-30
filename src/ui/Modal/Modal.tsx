import { Modal as AntdModal } from 'antd';
import Image, { StaticImageData } from 'next/image';
import { useEffect } from 'react';
import { StyledModal } from './style';
import { chequeSuccessDataInterface } from '@/interfaces';
import { useTranslations } from 'next-intl';
import { Button } from '../Button';

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
  chequeSuccessData?: chequeSuccessDataInterface | null;
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
  chequeSuccessData = null,
}: ModalProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  const t = useTranslations('UiModal')

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
          <div style={{ background: bgColor }} className='message-modal-img'>
            <Image src={img} width={34} height={34} alt='#' />
          </div>
        ) : null}

        {!chequeSuccessData ? <p className='modal-descripion'> {description} </p> : (
          <div className='message-modal-success'>
            <h2>{t('success')}</h2>
            <div className='message-modal-text_block'>
              <p className='message-modal-paragraph'>
                {t('address')}
              </p>
              <p className='message-modal-text'>
                {chequeSuccessData.address}
              </p>
            </div>
            <div className='message-modal-text_block'>
              <p className='message-modal-paragraph'>
                {t('date')}
              </p>
              <p className='message-modal-text'>
                {chequeSuccessData.date}
              </p>
            </div>
            <div className="confirmButton">
              <Button onClick={() => onCancel(false)} type="primary" htmlType="button" className='generalbtn' label={t('confirm')} />
            </div>
          </div>
        )}

      </div>
    </StyledModal>
  );
};
