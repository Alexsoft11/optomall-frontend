import GoToBack from "@/components/GoToBack";
import { CartBasketPage } from "@/features/Cart";
import { useTranslations } from "next-intl";
import Head from "next/head";

import React from "react";

export default function Cart() {
    const t = useTranslations('GLOBAL')
    return (
        <div className='container'>
            <Head>
                <title>{t('basket')}</title>
            </Head>
            <div style={{ color: "black", display: 'flex', flexDirection: 'column', gap: '30px', justifyContent: 'start', margin: '20px 0px 0px 0px' }}>
                <GoToBack pathArr={[{ title: "basket", path: "" }]} />
                <h1>{t('basket')}</h1>
               {CartMockdata.data.length?  <CartBasketPage /> : <CartBasketNoItems />}
            </div>
        </div>
    );
}
