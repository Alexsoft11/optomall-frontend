import React from 'react';
import styles from './CartGetOrder.module.scss';
import { CartGetOrderLocations, CartGetOrderPerson } from '../..';

export default function CartGetOrder() {
    return (
        <div className={styles.main}>
            <CartGetOrderLocations />
            <CartGetOrderPerson />
        </div>
    );
}
