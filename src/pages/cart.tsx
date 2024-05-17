
import { CartBasketPage, CartOrderPage } from '@/features/Cart';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';


import React from 'react';

export default function Cart() {
    const t = useTranslations('Cart')
    return (
        <div>
            <h1 style={{ color: "black", margin: '100px 0px 0px 50px' }}>{t('title')}</h1>
            <CartBasketPage />
        </div>
    );
}
