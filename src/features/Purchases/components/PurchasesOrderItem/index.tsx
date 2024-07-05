import React from 'react';
import styles from './PurchasesOrderItem.module.scss';
import { PurchasesItemInterface } from '../../interfaces';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface Props {
    item: PurchasesItemInterface
}

export default function PurchasesOrderItem({ item }: Props) {
    const t = useTranslations('Purchases')
    return (
        <div className={styles.main}>
            <div className={styles.item_img}>
                <Image height={80} width={80} alt="#" src={item.image_url} />
            </div>

            <div className={styles.item_text}>
                <div className={styles.item_info}>
                    <p>{item.title}</p>
                </div>

                <h3>{item.price} {t('currency')}</h3>
            </div>
        </div>
    );
}
