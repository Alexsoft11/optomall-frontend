import React from 'react';
import styles from './PageTitle.module.scss';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';

export default function PageTitle() {
    const t = useTranslations('GLOBAL')
    const router = useRouter();
    let pathArr = router.pathname.split("/")
    let title = ''

    function findPathName(step: number = -1) {
        if (!/\[.+\]/s.test((pathArr.at(step)) as string)) {
            title = pathArr.at(step) as string
        } else findPathName(step - 1)
    }
    findPathName()


    return (
        <div className={styles.main}>
            <h1>{t(title)}</h1>
        </div>
    );
}
