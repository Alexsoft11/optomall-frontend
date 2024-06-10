import { MessagesPage } from '@/Features/Messages';
import GoToBack from '@/components/GoToBack';
import PageTitle from '@/components/PageTitle';
import { MessagesMocdata } from '@/mockdata/Messages';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import React from 'react';

export default function Messages() {
    const t = useTranslations('GLOBAL')
    return (
        <div className='container'>
            <Head>
                <title>{t('messages')}</title>
            </Head>
            <div>
                <GoToBack pathArr={[{ title: "messages", path: "" }]} />
                <PageTitle/>
                <MessagesPage data={MessagesMocdata}  />
            </div>
        </div>
    );
}
