import React from 'react';
import styles from './Auth.module.css';
import SignIn from './Steps/SignIn';

import { AuAuthBackground } from '@/assets/images';
import Image from 'next/image';
import Registration from './Steps/Registration';
import Info from './Steps/Info';
import { useRouter } from 'next/router';

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
            </div>
        </div>
    );
}
