import React from 'react';
import styles from './CartOrder.module.scss';
import { CartOrderMockdata } from '@/mockdata/Cart';
import { useTranslations } from 'next-intl';
import { Button } from '@/ui';
import { useRouter } from 'next/router';
import CartGetOrder from '../CartGetOrder';


export default function CartOrder() {
    const t = useTranslations('Cart')
    const rout = useRouter()

    const toOrder = () => rout.push('/cart?step=order')

    return (
        <div className={styles.main}>
            <div className={styles.order_block}>
                <p className={styles.items_count}>{t('item')}, {CartOrderMockdata.itemsValue}</p>
                <div className={styles.total}>
                    <h1>{t('total')}</h1>
                    <p>{CartOrderMockdata.count} uzs</p>
                </div>
                <Button onClick={() => toOrder()} className={styles.complite_btn} label={t("complite")} />
            </div>
            <CartGetOrder />
        </div>
    );
}
