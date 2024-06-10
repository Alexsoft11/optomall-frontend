import React from 'react';
import styles from './MessagesItem.module.scss';
import { MessagesDataInterface } from '../interface';

interface Props {
    item: MessagesDataInterface
}

export default function MessagesItem({item}: Props) {
    return (
        <div className={styles.main}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
        </div>
    );
}
