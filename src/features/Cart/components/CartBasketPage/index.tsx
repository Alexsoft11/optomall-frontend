import React from 'react';
import styles from './CartBasketPage.module.scss';
import { CartBasketItems, CartGetOrder, CartOrderBlock } from '@/features/Cart';

export default function CartBasketPage() {
    return (
        <div className={styles.main}>
            <CartBasketItems />
            <CartOrderBlock />
        </div>
    );
}
