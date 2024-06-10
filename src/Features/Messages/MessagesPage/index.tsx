import React, { Fragment } from 'react';
import styles from './MessagesPage.module.scss';
import { MessagesDataInterface } from '../interface';
import MessagesItem from '../MessagesItem';

interface Props {
    data: MessagesDataInterface[]
}

export default function MessagesPage({ data }: Props) {
    return (
        <div className={styles.main}>
            {data.map(el => (
                <Fragment key={el.id}>
                    <MessagesItem item={el} />
                </Fragment>
            ))}
        </div>
    );
}
