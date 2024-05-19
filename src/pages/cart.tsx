import { CartBasketPage } from '@/features/Cart';
import { useTranslations } from 'next-intl';


import React from 'react';

export default function Cart() {
    const t = useTranslations('GLOBAL')
    return (
        <div>
            <h1 style={{ color: "black", margin: '100px 0px 0px 50px' }}>{t('basket')}</h1>
            <CartBasketPage />
        </div>
    );
}
