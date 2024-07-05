import GoToBack from '@/components/GoToBack';
import PageTitle from '@/components/PageTitle';
import { PurchasesOrderInterface } from '@/features/Purchases/interfaces';
import { PurchasesMockdata } from '@/mockdata/Purchases';
import { API } from '@/services/api';
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

interface Props {
    purchasesData: PurchasesOrderInterface[] | []
}

export default function Purchases({ purchasesData}: Props) {
    const t = useTranslations("GLOBAL");
    return (
        <div className="container">
            <Head>
                <title>{t("purchases")}</title>
            </Head>
            <div>
                <GoToBack pathArr={[{ title: "purchases", path: "" }]} />
                <PageTitle />
                <PurchasesPage data={purchasesData} />
            </div>
        </div>
    );
}


export const getServerSideProps = async (context: any) => {

    try {
        const token = decodeURIComponent(context.req.headers.cookie.match(/ token=([^;]+)/)[1])
        const { filter } = context.query

        const purchasesResponse = await API.getPurchases(token, filter);

        return {
            props: {
                purchasesData: purchasesResponse || [],
            },
        };
    } catch (error: any) {
        console.error("Error fetching data:", error.message);
        return {
            props: {
                purchasesData: [],
            },
        };
    }
};
