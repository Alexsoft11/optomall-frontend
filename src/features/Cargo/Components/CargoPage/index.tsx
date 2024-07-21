import React from 'react';
import styles from './CargoPage.module.scss';
import CargoCheque from '../CargoCheque';
import { CartOrderBlock } from '@/features/Cart';

interface Props {
    orderData: number;
}

export default function OrderPage({ orderData }: Props) {
    return (
        <div className={styles.main}>
            <CargoCheque cardId={'00000000000'} cost={orderData} />
            <CartOrderBlock cargoId={0} cargoCost={5} uploadUrl="add-check" cost={`${orderData} $`} />
        </div>
    );
}
