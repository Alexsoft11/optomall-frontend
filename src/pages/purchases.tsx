import GoToBack from '@/components/GoToBack';
import PageTitle from '@/components/PageTitle';
import { PurchasesMockdata } from '@/mockdata/Purchases';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';

const PurchasesPage = dynamic(
    () => import("@/features/Purchases/components/PurchasesPage")
    // {
    //   loading: () => <Loader />,
    // }
  );

export default function Purchases() {
    const t = useTranslations("GLOBAL");
    return (
        <div className="container">
            <Head>
                <title>{t("purchases")}</title>
            </Head>
            <div>
                <GoToBack pathArr={[{ title: "purchases", path: "" }]} />
                <PageTitle />
                <PurchasesPage data={PurchasesMockdata} />
            </div>
        </div>
    );
}
