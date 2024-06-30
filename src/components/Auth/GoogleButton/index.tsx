import React from 'react';
import styles from './GoogleButton.module.css';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { GoogleLogo } from '$/assets/images';
import { signIn } from "next-auth/react"

export default function GoogleButton() {
    const t = useTranslations("Auth")
    const signInWithGoogle = () => {        
        signIn('google', {callbackUrl: 'http://localhost:3000'})
    }
    return (
        <>
            <button className={styles.button} onClick={() => signInWithGoogle()}>
                <div className={styles.img}>
                    <Image fill src={GoogleLogo} alt='#' />
                </div>
                {t('continueGoogle')}
            </button>
        </>
    );
}
