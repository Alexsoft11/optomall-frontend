import React, { useState, useEffect } from 'react';
import styles from './ReviewModal.module.scss';
import { Form, Input, Modal, Rate, Upload, message } from 'antd';
import { useTranslations } from 'next-intl';
import { Button } from '@/ui';
import Image from 'next/image';
import { AddSvg } from '$/assets/images';

interface Props {
    modalIsOpen: boolean,
    onCancel: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ReviewModal({ modalIsOpen, onCancel }: Props) {
    const [form] = Form.useForm();
    const t = useTranslations('MyReviews')
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [starsValue, setStarsVale] = useState(0)

    const chngeStars = (number: number) => {
        setStarsVale(number)
    }

    const beforeUpload = (file: any) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            setFileError('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            setFileError('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = (info: any) => {
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            setImageUrl(info.file.response.url);
        }
    }

    useEffect(() => {
        if (fileError) {
            message.error(fileError);
            setFileError(null);
        }
    }, [fileError]);

    const onFinish = (values: any) => {
        onCancel(false)
    }

    return (
        <Modal className='review-modal' title={t('review')} open={modalIsOpen} onCancel={() => onCancel(false)}>
            <Form
                form={form}
                onFinish={(data) => onFinish(data)}
            >
                <div className='review-modal__rate'>
                    <p>{t('reviewProduct')}</p>
                    <Rate value={starsValue} onChange={(number) => chngeStars(number)} />
                </div>
                <div className='review-modal__comment'>
                    <Form.Item name='comment' >
                        <Input type='text' placeholder={t('enterComment')} />
                    </Form.Item>
                </div>
                <div className='review-modal__upload'>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="/example-fooo"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? <Image src={imageUrl} alt="" style={{ width: '100%' }} /> : <Image src={AddSvg} width={24} height={24} alt="" style={{ width: '100%' }} />}
                    </Upload>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="/example-fooo"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? <Image src={imageUrl} alt="" style={{ width: '100%' }} /> : <Image src={AddSvg} width={24} height={24} alt="" style={{ width: '100%' }} />}
                    </Upload>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="/example-fooo"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? <Image src={imageUrl} alt="" style={{ width: '100%' }} /> : <Image src={AddSvg} width={24} height={24} alt="" style={{ width: '100%' }} />}
                    </Upload>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="/example-fooo"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? <Image src={imageUrl} alt="" style={{ width: '100%' }} /> : <Image src={AddSvg} width={24} height={24} alt="" style={{ width: '100%' }} />}
                    </Upload>
                </div>
                <Form.Item className='review-modal__submitButton'>
                    <Button type="primary" htmlType="submit" label={t('sendReview')} />
                </Form.Item>
            </Form>
        </Modal>
    );
}
