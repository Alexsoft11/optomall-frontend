import React, { Fragment } from 'react';
import styles from './PurchasesPage.module.scss';
import { PurchasesOrderInterface } from '../../interfaces';
import PurchasesItem from '../PurchasesItem';

interface Props {
    data: PurchasesOrderInterface[]
}
    
export default function PurchasesPage({data}: Props) {
    return (
        <div className={styles.main}>
            <div className={styles.items}>
                {data?.map(el => (
                    <Fragment key={el.id}>
                        <PurchasesItem item={el} />
                    </Fragment>
                ))}
            </div>
        </div>
    );
}
