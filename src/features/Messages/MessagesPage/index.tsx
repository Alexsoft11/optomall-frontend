import React, { Fragment } from 'react';
import styles from './MessagesPage.module.scss';
import { MessagesDataInterface } from '../interface';
import MessagesItem from '../MessagesItem';

interface Props {
    messagesData: MessagesDataInterface[]
}

export default function MessagesPage({ messagesData }: Props) {
    return (
        <div className={styles.main}>
            {messagesData.map(el => (
                <Fragment key={el.id}>
                    <MessagesItem item={el} />
                </Fragment>
            ))}
        </div>
    );
}
