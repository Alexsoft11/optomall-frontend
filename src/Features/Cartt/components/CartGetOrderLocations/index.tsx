import React from 'react';
import styles from './CartGetOrderLocations.module.scss';
import { useTranslations } from 'next-intl';

export default function CartGetOrderLocations() {
    const t = useTranslations('Cart')
    return (
        <div className={styles.main}>
            <div className={styles.text_block}>
                <h2>{t('address')}</h2>
                <p>{t('addressInMap')}</p>
            </div>
            <a href="#">{t('enterAddres')}</a>
        </div>
    );
}
