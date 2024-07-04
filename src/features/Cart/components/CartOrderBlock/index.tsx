import React, { useState } from 'react';
import styles from './CartOrder.module.scss';
import { useTranslations } from 'next-intl';
import { Button, Modal } from '@/ui';
import { useRouter } from 'next/router';
import { SearchSvg, SuccsessSvg, WarningSvg } from '$/assets/images';
import { CartOrderItemInterface } from '../../interface';
import useQueryApiClient from '@/utils/useQueryApiClient';
import { message } from 'antd';

interface Props {
    cost: number;
    itemValue?: number,
    orderId?: string,
    personData?: any,
    location?: number[] | null,
    items: CartOrderItemInterface[] | [],
    country: string | null
}

export default function CartOrderBlock({ cost, items, itemValue, orderId, location, personData, country }: Props) {
    const t = useTranslations('Cart')
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [responseModal, setResponseModal] = useState(false);
    const [response, setResponse] = useState(Boolean || null);
    const rout = useRouter();

    const orderModals = () => {
        setModalIsOpen(true)
        setTimeout(() => {
            setResponse(false)
            setModalIsOpen(false)
            setResponseModal(true)
        }, 2000)
    }

    const { appendData: createData } = useQueryApiClient({
        request: {
          url: "orders",
          method: "POST",
          disableOnMount: true,
        },
        onSuccess(res) {
          console.log(res);
        },
        onError(res) {
          console.log(res);
        },
      });


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

        createData(toOrder)

        console.log(data);
        
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
                <Button onClick={orderModals} className={styles.complite_btn} label={t("loadCheque")} /> :
                <Button onClick={() => toOrder()} className={styles.complite_btn} label={t("complite")} />
            }
            <Modal
                onCancel={setModalIsOpen}
                className='bg_white'
                img={SearchSvg}
                description={t("checkMessage")}
                open={modalIsOpen}
            />

            {response ?
                <Modal
                    onCancel={setResponseModal}
                    img={SuccsessSvg}
                    chequeSuccessData={{
                        address: 'Lorem ipsum is dolor set amet consectetur ',
                        date: '29.04.2024 - 17:10'
                    }}
                    open={responseModal}
                    className='ant-modal-closeBtn-closed bg_green'
                /> :
                <Modal
                    className='bg_red'
                    onCancel={setResponseModal}
                    img={WarningSvg}
                    description={t("checkWarningMessage")}
                    open={responseModal}
                />
            }
        </div>
    );
}
