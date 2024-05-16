import React from 'react';
import styles from './CartOrderPage.module.scss';
import { useTranslations } from 'next-intl';
import { CartMockdata } from '@/mockdata/Cart';
import CertOrderItems from '../CartOrderItems';
import CartOrder from '../CartOrder';
import CartGetOrder from '../CartGetOrder';

export default function CartOrderPage() {

    const t = useTranslations('Cart')

    return (
        <div className={styles.main}>
            <h1>{t('title')}</h1>
            <div className={styles.page_block}>
                <CertOrderItems data={CartMockdata} />
                <CartOrder />
                <CartGetOrder />
            </div>
        </div>
    );
}
