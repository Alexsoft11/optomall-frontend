import React, { useState, useEffect, Fragment } from 'react';
import styles from './ReviewModal.module.scss';
import { Form, Rate, Upload, message } from 'antd';
import { useTranslations } from 'next-intl';
import { Button, Input, Modal } from '@/ui';
import Image from 'next/image';
import { AddSvg } from '$/assets/images';
import { RcFile } from 'antd/es/upload';

interface Props {
    modalIsOpen: boolean,
    onCancel: React.Dispatch<React.SetStateAction<boolean>>;
    productId: number,
    setCommentData: React.Dispatch<React.SetStateAction<FormData | undefined>>
}

const initailFileList = [
    {
        id: 0,
        url: AddSvg,
        initialUrl: true,
        data: null
    },
    {
        id: 1,
        url: AddSvg,
        initialUrl: true,
        data: null
    },
    {
        id: 2,
        url: AddSvg,
        initialUrl: true,
        data: null
    },
    {
        id: 3,
        url: AddSvg,
        initialUrl: true,
        data: null
    },
]

export default function ReviewModal({ modalIsOpen, onCancel, productId, setCommentData }: Props) {
    const [form] = Form.useForm();
    const t = useTranslations('MyReviews')
    const [fileList, setFileList] = useState<any[]>(initailFileList);
    const [fileError, setFileError] = useState(null)
    const [starsValue, setStarsVale] = useState(0)
    const [isUploadErr, setIsUploadErr] = useState(false);

    useEffect(() => {
        if (fileError) {
            message.error(fileError);
            setFileError(null);
        }
    }, [fileError]);

    const getBase64 = (file: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => callback(reader.result as string);
        reader.onerror = (error) => {
            console.error('Error converting file to base64:', error);
        };
    };

    const hendleOnChange = (info: any, id: number) => {
        if (info.file.status === 'done' && !isUploadErr) {

            const image = info.file.originFileObj;

            delete image.uid;

            if (image) {
                getBase64(image, (url) => {
                    const copy = fileList.map(el => el.id === id ? { ...el, initialUrl: false, url: url, data: image } : { ...el })
                    setFileList(copy)
                });
            }
        }
    }

    const chngeStars = (number: number) => {
        setStarsVale(number)
    }

    const returnToInitialValue = () => {
        setFileList(initailFileList)
        form.setFieldValue('comment', '')
        setStarsVale(0)
        onCancel(false)
    }

    const uploadProps = {
        className: 'upload_block',
        name: 'file',
        showUploadList: false,
        multiple: false,
        beforeUpload: (file: RcFile) => {
            const isImage = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isImage) {
                setIsUploadErr(true)
                message.error(t('imgTypeValidation'));
                return
            }
            const isLt3M = file.size / 1024 / 1024 < 3;
            if (!isLt3M) {
                setIsUploadErr(true)
                message.error(t('imgSizeValidation'));
                return
            }
        }
    };


    const onFinish = (values: any) => {
        const formData = new FormData()
        const newFileList: File[] = fileList.map(el => el.data !== null ? el.data : null).filter(el => el !== null)
        newFileList.forEach((file) => {
            formData.append('images[]', file);
        });
        formData.append('name', values.comment)
        formData.append('rating', starsValue.toString())
        formData.append('order_id', productId.toString())
        setCommentData(formData)
        returnToInitialValue()
    }

    const modalProps = {
        children: (
            <div className='review_modal'>
                <Form
                    form={form}
                    onFinish={onFinish}
                >
                    <div className='review-modal__rate'>
                        <p>{t('reviewProduct')}</p>
                        <Rate value={starsValue} onChange={(number) => chngeStars(number)} />
                    </div>
                    <div className='review-modal__comment'>
                        <Input name='comment' type='text' placeholder={t('enterComment')} />
                    </div>
                    <div className='review-modal__upload'>
                        {fileList.map((el) => (
                            <Fragment key={el.id}>
                                <Upload {...uploadProps} onChange={(info) => hendleOnChange(info, el.id)}>
                                    {!el.initialUrl ? <Image src={el.url} fill alt="#" /> : <Image src={el.url} width={24} height={24} alt="#" />}
                                </Upload>
                            </Fragment>
                        ))
                        }
                    </div>
                    <Button className='review-modal__submitButton' type="primary" htmlType="submit" label={t('sendReview')} />
                </Form>
            </div>
        ),
        title: t('review'),
        open: modalIsOpen,
        onCancel: () => returnToInitialValue(),
        onClose: () => returnToInitialValue()
    }


    return (
        <Modal {...modalProps} />
    );
}
