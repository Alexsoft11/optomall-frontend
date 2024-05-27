import React from 'react';
import styles from './OrderCheque.module.scss';
import { useTranslations } from 'next-intl';

interface Props {
    cost: number,
    cardId: string
}

export default function OrderCheque({cardId, cost}: Props) {

    const t = useTranslations('Order')


    return (
        <div className={styles.main}>
            <p className={styles.pay_text}>
                {t("payTutorialText")}
            </p>
            <p className={styles.pay_cost}>
                {t("payCost")}
                <span>{cost}</span>
            </p>
            <p className={styles.card_number}>
                {t("cardNumber")}
                <span>{cardId}</span>
            </p>

        </div>
    );
}
