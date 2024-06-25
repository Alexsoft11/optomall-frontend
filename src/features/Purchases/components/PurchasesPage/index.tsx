import React, { Fragment, useState } from 'react';
import styles from './PurchasesPage.module.scss';
import { PurchasesOrderInterface } from '../../interfaces';
import PurchasesItem from '../PurchasesItem';
import { Button } from 'antd';
import { useTranslations } from 'next-intl';

interface Props {
    data: PurchasesOrderInterface[]
}

export default function PurchasesPage({ data }: Props) {
    const t = useTranslations('Purchases')
    const [defautlSwitch, setDefautlSwitch] = useState(true)

    const setSwitch = () => {
        setDefautlSwitch(!defautlSwitch)
    }

    return (
        <div className={styles.main}>
            <div className={styles.switch_buttons}>
                <Button onClick={() => setSwitch()} className={`${defautlSwitch? styles.active_switch : null}`}>
                    {t('active')}
                </Button>
                <Button onClick={() => setSwitch()} className={`${!defautlSwitch? styles.active_switch : null}`}>
                    {t('all')}
                </Button>
            </div>
            <div className={styles.items_block}>
                <div className={styles.items}>
                    {data?.map(el => (
                        <Fragment key={el.id}>
                            <PurchasesItem item={el} />
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
