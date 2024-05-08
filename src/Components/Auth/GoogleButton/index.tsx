import React from 'react';
import styles from './GoogleButton.module.css';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { GoogleLogo } from '@/assets/icons';

export default function GoogleButton() {
    const t = useTranslations("Auth")
    return (
        <>
            <button className={styles.button}>
                <div className={styles.img}>
                    <Image fill src={GoogleLogo} alt='#' />
                </div>
                {t('continueGoogle')}
            </button>
        </>
    );
}
