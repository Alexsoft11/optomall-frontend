import React from 'react';
import styles from './GoogleButton.module.scss';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { GoogleLogo } from '$/assets/images';
import { useRouter } from 'next/router';
import { useGoogleLogin } from '@react-oauth/google';
import useQueryApiClient from '@/utils/useQueryApiClient';
import Cookies from 'universal-cookie';

export default function GoogleButton() {
    const router = useRouter();
    const t = useTranslations("Auth")
    const cookie = new Cookies()

    const { appendData: createData } = useQueryApiClient({
        request: {
            url: "google-login",
            method: "POST",
            disableOnMount: true,
        },
        onSuccess(res) {
            if (router.query.step === 'signUp') {
                router.push(`/auth?step=info&id=${res.unique_id}`)
            } else {
                cookie.set('token', res.token)
                router.push(`/`)
            }
        },
    });

    const handleLoginSuccess = (response: any) => {
        const accessToken = response.access_token;
        createData({token: accessToken})
    };

    const handleLoginError = (error: any) => {
        console.log('Login Failed:', error);
    };

    const login = useGoogleLogin({
        onSuccess: handleLoginSuccess,
        onError: handleLoginError,
        flow: 'implicit', 
    });

    return (
        <div className={styles.main}>
            <button className={styles.button} type='button' onClick={() => login()}>
                <div className={styles.img}>
                    <Image fill src={GoogleLogo} alt='#' />
                </div>
                {t('continueGoogle')}
            </button>
        </div>
    );
}
