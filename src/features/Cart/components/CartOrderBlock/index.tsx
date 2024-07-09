import React, { useState } from 'react';
import styles from './CartOrder.module.scss';
import { useTranslations } from 'next-intl';
import { Button, Modal } from '@/ui';
import { useRouter } from 'next/router';
import { SearchSvg, SuccsessSvg, WarningSvg } from '$/assets/images';
import { CartOrderItemInterface, CreateOrderDataInterface } from '../../interface';
import useQueryApiClient from '@/utils/useQueryApiClient';
import { message, Upload } from 'antd';

interface Props {
    cost: number;
    itemValue?: number,
    orderId?: number,
    createOrderData?: CreateOrderDataInterface 
}

export default function CartOrderBlock({ cost, itemValue, orderId, createOrderData }: Props) {
    const t = useTranslations('Cart')
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const router = useRouter();
    const [buttonStatus, setButtonStatus] = useState<'idle' | 'pending' | 'success' | 'fail'>('idle');

    const buttonClass = `${styles['loading-btn']} ${buttonStatus === 'pending'
        ? styles['loading-btn--pending']
        : buttonStatus === 'success'
            ? styles['loading-btn--success']
            : buttonStatus === 'fail'
                ? styles['loading-btn--fail']
                : ''
        }`;

    const modalClose = () => {
        router.push('/purchases?filter=active')
        setModalIsOpen(false)
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
            setModalIsOpen(true)
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
        onChange(info: any) {
            if (info.file.status === 'done') {
                const image = info.file.originFileObj;
                delete image.uid

                const formData = new FormData();
                if (orderId) {
                    formData.append('image', image);
                    formData.append('order_id', orderId.toString());
                    createChequeData(formData)
                    setButtonStatus('pending')
                }
            }
        },
    };


    const toOrder = () => {
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
                onCancel={modalClose}
                className='bg_white'
                img={SearchSvg}
                description={t("checkMessage")}
                open={modalIsOpen}
            />
        </div>
    );
}
