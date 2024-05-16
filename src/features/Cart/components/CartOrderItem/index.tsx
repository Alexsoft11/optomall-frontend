import React from 'react';
import styles from './CartOrderItem.module.scss';
import { CartOrderItemInterface } from '../../interface';
import Image from 'next/image';

interface Props {
    item: CartOrderItemInterface
}

export default function CartOrderItem({ item }: Props) {
    return (
        <div className={styles.main}>
            <div className={styles.img}>
                <Image src={item.image} alt='#' fill />
            </div>
        </div>
    );
}
