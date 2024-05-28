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
            <CartBasketPage />
        </div>
    );
}
