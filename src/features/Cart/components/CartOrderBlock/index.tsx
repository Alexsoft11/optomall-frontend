import React, { useState } from 'react';
import styles from './CartOrder.module.scss';
import { useTranslations } from 'next-intl';
import { Button, Modal } from '@/ui';
import { useRouter } from 'next/router';
import { SearchSvg, } from '$/assets/images';
import { CreateOrderDataInterface } from '../../interface';
import useQueryApiClient from '@/utils/useQueryApiClient';
import { message, Upload } from 'antd';
import Cookies from 'universal-cookie';
import { RcFile } from 'antd/es/upload';
import { LocationInfoInterface } from '@/components/Types';

interface Props {
    cost: string;
    itemValue?: number,
    orderId?: number,
    cargoCost?: number,
    createOrderData?: CreateOrderDataInterface,
    isCart?: boolean
    uploadUrl?: string,
    type?: string,
}

export default function CartOrderBlock({ cost, itemValue, orderId, createOrderData, type, isCart = false, cargoCost }: Props) {
    const t = useTranslations('Cart')
    const [checkModalIsOpen, setCheckModalIsOpen] = useState(false);
    const [authModalIsOpen, setAuthModalIsOpen] = useState(false);
    const [isUploadErr, setIsUploadErr] = useState(false);
    const [messageVisible, setMessageVisible] = useState(false);

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
        router.push('/purchases?filter=in_verification')
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
            url: 'add-check',
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

                formData.append('type', type as string);
                formData.append('image', image);
                formData.append('order_id', orderId!.toString());
                createChequeData(formData);
                setButtonStatus('pending');
            }
        },
    };

    const modalProps = {
        onCancel: () => setAuthModalIsOpen(false),
        className: 'bg_white',
        img: SearchSvg,
        description: t("authMessage"),
        children: (<Button onClick={() => router.push('auth?step=signin')} className='signIn_btn' label={t('signin')} />),
        open: authModalIsOpen
    }

    const toOrder = () => {
        if (!cookie.get('token')) {
            setAuthModalIsOpen(true)
            return
        }
        if (itemValue === 0) {
            if (!messageVisible) {
                setMessageVisible(true);
                message.error(t('chooseItem'), 1)
                setTimeout(() => setMessageVisible(false), 1000)
            }
            return
        }
        if (createOrderData) {
            const userData = createOrderData.userData
            for (let value in createOrderData.location) {
                if (!createOrderData.location[value as keyof LocationInfoInterface]) {
                    return message.error(t(`locationRequired`), 2)
                }
            }
            if (!userData || !userData.name || !userData.phone) {

                return message.error(t(`userDataRequired`), 2)
            }

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
                {cargoCost ? (
                    <div className={styles.cargo_title}>
                        <p>{t('cargo')}</p>
                        <p>{cargoCost}$ {t("forKg")}</p>
                    </div>
                ) : null}
                <div >
                    <h1>{t('total')}:</h1>
                    <p>{cost}</p>
                </div>
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
                </Upload> : null}
            {isCart ? <Button onClick={() => toOrder()} className={styles.complite_btn} label={t("complite")} /> : null}


            <Modal
                onCancel={checkModalClose}
                className='bg_white'
                img={SearchSvg}
                description={t("checkMessage")}
                open={checkModalIsOpen}
            />
            <Modal {...modalProps} />
        </div>
    );
}
