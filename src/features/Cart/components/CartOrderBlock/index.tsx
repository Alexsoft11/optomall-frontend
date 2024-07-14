import React, { useState } from 'react';
import styles from './CartOrder.module.scss';
import { useTranslations } from 'next-intl';
import { Button, Modal } from '@/ui';
import { useRouter } from 'next/router';
import { SearchSvg,} from '$/assets/images';
import { CreateOrderDataInterface } from '../../interface';
import useQueryApiClient from '@/utils/useQueryApiClient';
import { message, Upload } from 'antd';
import Cookies from 'universal-cookie';
import { RcFile } from 'antd/es/upload';

interface Props {
    cost: number;
    itemValue?: number,
    orderId?: number,
    createOrderData?: CreateOrderDataInterface
}

export default function CartOrderBlock({ cost, itemValue, orderId, createOrderData }: Props) {
    const t = useTranslations('Cart')
    const [checkModalIsOpen, setCheckModalIsOpen] = useState(false);
    const [authModalIsOpen, setAuthModalIsOpen] = useState(false);
    const [isUploadErr, setIsUploadErr] = useState(false);

    const router = useRouter();
    const [buttonStatus, setButtonStatus] = useState<'idle' | 'pending' | 'success' | 'fail'>('idle');
    const cookie = new Cookies()

    const buttonClass = `${styles['loading-btn']} ${buttonStatus === 'pending'
        ? styles['loading-btn--pending']
        : buttonStatus === 'success'
            ? styles['loading-btn--success']
            : buttonStatus === 'fail'
                ? styles['loading-btn--fail']
                : ''
        }`;

    const checkModalClose = () => {
        router.push('/purchases?filter=active')
        setCheckModalIsOpen(false)
    }

    const { appendData: createData } = useQueryApiClient({
        request: {
            url: "orders",
            method: "POST",
            disableOnMount: true,
        },
        onSuccess(res) {
            router.push(`order/${res.order_id}`)
        },
    });

    const { appendData: createChequeData } = useQueryApiClient({
        request: {
            url: "add-check",
            method: "POST",
            disableOnMount: true,
            multipart: true
        },
        onSuccess(res) {
            setCheckModalIsOpen(true)
            setButtonStatus('success');
            setTimeout(() => setButtonStatus('idle'), 1000);
        },
        onError(err) {
            setButtonStatus('fail');
            setTimeout(() => setButtonStatus('idle'), 1000);
        }
    });

    const props = {
        name: 'file',
        className: styles.upload_btn,
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
        },
        onChange(info: any) {
            if (info.file.status === 'done' && !isUploadErr) {

                const image = info.file.originFileObj;
                delete image.uid;

                const formData = new FormData();
                if (orderId) {
                    formData.append('image', image);
                    formData.append('order_id', orderId.toString());
                    createChequeData(formData);
                    setButtonStatus('pending');
                }
            }
        },
    };



    const toOrder = () => {
        if (!cookie.get('token')) {
            setAuthModalIsOpen(true)
            return
        }
        createData(createOrderData)
    }

    return (
        <div className={styles.main}>
            {orderId ?
                <p className={styles.order_title}>{t('payment')}</p> :
                <p className={styles.order_title}>{t('item')}, {itemValue}</p>
            }
            <div className={styles.total}>
                <h1>{t('total')}:</h1>
                <p>{cost} uzs</p>
            </div>
            {orderId ?
                <Upload {...props}>
                    <div className={styles.response_button__block}>
                        <span className={styles['loading-btn-wrapper']}>
                            <button className={buttonClass} disabled={buttonStatus === 'pending'}>
                                <span className={styles['loading-btn__text']}>
                                    {buttonStatus === 'idle' && t('loadCheque')}
                                </span>
                            </button>
                        </span>
                    </div>
                </Upload> :
                <Button onClick={() => toOrder()} className={styles.complite_btn} label={t("complite")} />
            }
            <Modal
                onCancel={checkModalClose}
                className='bg_white'
                img={SearchSvg}
                description={t("checkMessage")}
                open={checkModalIsOpen}
            />
            <Modal
                onCancel={() => setAuthModalIsOpen(false)}
                className='bg_white'
                img={SearchSvg}
                description={t("authMessage")}
                open={authModalIsOpen}
            />
        </div>
    );
}
