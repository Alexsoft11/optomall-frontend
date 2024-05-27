import { CartBasketPage } from '@/features/Cart';
import { useTranslations } from 'next-intl';
import Head from 'next/head';


import React from 'react';

export default function Cart() {
    const t = useTranslations('GLOBAL')
    return (
        <div className='container'>
            <Head>
                <title>{t('basket')}</title>
            </Head>
            <h1 style={{ color: "black", margin: '100px 0px 0px 50px' }}>{t('basket')}</h1>
            <CartBasketPage />
        </div>
    );
}
