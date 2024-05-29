import React from 'react';
import styles from './CartGetOrder.module.scss';
import CartGetOrderLocations from '../CartGetOrderLocations';
import CartGetOrderPerson from '../CartGetOtderPerson';

export default function CartGetOrder() {
    return (
        <div className={styles.main}>
            <CartGetOrderLocations />
            <CartGetOrderPerson />
        </div>
    );
}
