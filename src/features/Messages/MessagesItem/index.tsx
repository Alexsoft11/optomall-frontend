import React from 'react';
import styles from './MessagesItem.module.scss';
import { MessagesDataInterface } from '../interface';
import { useLocale, useTranslations } from 'next-intl';
import { LanguageStringIntergace } from '@/interfaces';

interface Props {
    item: MessagesDataInterface
}

export default function MessagesItem({ item }: Props) {
    const t = useTranslations("Messages")
    const locale = useLocale();
    const openPageWithProduct = () => window.open(`/purchases?filter=all&orderId=${item.order_id}`, '_blank', 'noopener,noreferrer')
    return (
        <div className={styles.main}>
            <h3>{t('dearClient')}{item.message[locale as keyof LanguageStringIntergace]}</h3>
            <h3>
                {t('order')}
                <p onClick={openPageWithProduct}>{item.order_id}</p>
            </h3>
            <p>{t('thanksForBuy')}</p>
        </div>
    );
}
