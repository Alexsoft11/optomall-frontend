import GoToBack from '@/Components/GoToBack';
import { CartBasketPage } from '@/features/Cart';
import { useTranslations } from 'next-intl';


import React from 'react';

export default function Cart() {
    const t = useTranslations('GLOBAL')
    return (
        <div style={{ color: "black", display:'flex', flexDirection:'column', gap:'30px', justifyContent:'start', margin: '100px 0px 0px 50px' }}>
            <GoToBack pathArr={[{ title: "catalog", path: "" }]} />
            <h1>{t('basket')}</h1>
            <CartBasketPage />
        </div>
    );
}
