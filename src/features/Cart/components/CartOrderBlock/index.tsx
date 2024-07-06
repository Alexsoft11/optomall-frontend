import React, { useState } from 'react';
import styles from './CartOrder.module.scss';
import { useTranslations } from 'next-intl';
import { Button, Modal } from '@/ui';
import { useRouter } from 'next/router';
import { SearchSvg, SuccsessSvg, WarningSvg } from '$/assets/images';
import { CartOrderItemInterface } from '../../interface';
import useQueryApiClient from '@/utils/useQueryApiClient';
import { message, Upload } from 'antd';

interface Props {
    cost: number;
    itemValue?: number,
    orderId?: number,
    personData?: any,
    location?: number[] | null,
    items?: CartOrderItemInterface[] | [],
    country?: string | null
}

export default function CartOrderBlock({ cost, items, itemValue, orderId, location, personData, country }: Props) {
    const t = useTranslations('Cart')
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const router = useRouter();

    const modalClose = () => {
        router.push('/purchases')
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
        },
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
                }
            }
        },
    };


    const toOrder = () => {
        const data = {
            total_price: cost,
            location: {
                name: country,
                url: location,
            },
            userData: personData,
            items: items,
        }

        createData(data)
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
                    <Button className={styles.complite_btn} label={t("loadCheque")} />
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
