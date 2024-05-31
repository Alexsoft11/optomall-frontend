import { MessagesPage } from '@/Features/Messages';
import GoToBack from '@/components/GoToBack';
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
            <div style={{ color: "black", display: 'flex', flexDirection: 'column', gap: '30px', justifyContent: 'start', margin: '10px 0px 0px 0px' }}>
                <GoToBack pathArr={[{ title: "messages", path: "" }]} />
                <h1>{t('basket')}</h1>
                <MessagesPage data={MessagesMocdata}  />
            </div>
        </div>
    );
}
