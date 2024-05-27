import React from 'react';
import styles from './CartOrder.module.scss';
import { useTranslations } from 'next-intl';
import { Button } from '@/ui';
import { useRouter } from 'next/router';
import CartGetOrder from '../CartGetOrder';

interface Props {
    cost: number;
    itemValue?: number,
    orderId?: string
}

export default function CartOrder({ cost, itemValue, orderId }: Props) {
    const t = useTranslations('Cart')
    const rout = useRouter()

    const toOrder = () => rout.push(`/order`)

    return (
        <div className={styles.main}>
            <div className={styles.order_block}>
                {orderId?
                    <p className={styles.order_title}>{t('item')}, {itemValue}</p> :
                    <p className={styles.order_title}>{t('payment')}</p>
                }
                <div className={styles.total}>
                    <h1>{t('total')}</h1>
                    <p>{cost} uzs</p>
                </div>
                {orderId?
                    <Button className={styles.complite_btn} label={t("loadCheque")} />:
                    <Button onClick={() => toOrder()} className={styles.complite_btn} label={t("complite")} />
                }
            </div>
            
        </div>
    );
}
