import React from 'react';
import styles from './AuthPage.module.css';
import { AuAuthBackground } from '$/assets/images';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ForgotPassword, Info, Registration, SignIn } from './Steps';

export default function AuthPage() {
    let rout = useRouter()
    
    return (
        <div className='auth'>
            <div className={styles.main}>
                <div className={styles.img}>
                    <Image src={AuAuthBackground} alt='#' fill={true} />
                </div>
                {rout.query.step === "signin" ? <SignIn /> : null}
                {rout.query.step === "regist" ? <Registration /> : null}
                {rout.query.step === "info" ? <Info /> : null}
                {rout.query.step === "forgot-password" ? <ForgotPassword /> : null}
            </div>
        </div>
    );
}
