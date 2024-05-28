import React from 'react';
import styles from './OrderCheque.module.scss';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { CopySvg } from '$/assets/images';

interface Props {
    cost: number,
    cardId: string
}

export default function OrderCheque({ cardId, cost }: Props) {

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
                <div>
                    <p>{cardId}</p>
                    <Image src={CopySvg} width={24} height={24} alt='#' />
                </div>
            </p>

        </div>
    );
}
