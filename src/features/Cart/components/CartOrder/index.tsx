import React from 'react';
import styles from './CartOrder.module.scss';
import { CartOrderMockdata } from '@/mockdata/Cart';
import { useTranslations } from 'next-intl';
import { Button } from '@/ui';

export default function CartOrder() {
    const t = useTranslations('Cart')
    return (
        <div className={styles.main}>
            <p className={styles.items_count}>{t('item')}, {CartOrderMockdata.itemsValue}</p>
            <div className={styles.total}>
                <h1>{t('total')}</h1>
                <p>{CartOrderMockdata.count} uzs</p>
            </div>
            <Button className={styles.complite_btn} label={t("complite")} />
        </div>
    );
}
