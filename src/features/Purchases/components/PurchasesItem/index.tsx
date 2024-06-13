import React, { Fragment, useState } from 'react';
import styles from './PurchasesItem.module.scss';
import { PurchasesOrderInterface } from '../../interfaces';
import { useTranslations } from 'next-intl';
import SvgSelector from '$/assets/icons/SvgSelector';
import { Swiper, SwiperSlide } from "swiper/react";
import PurchasesOrderItem from '../PurchasesOrderItem';

interface Props {
    item: PurchasesOrderInterface
}

export default function PurchasesItem({ item }: Props) {
    const t = useTranslations('Purchases')

    const [isRotatedUp, setIsRotatedUp] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true)
    const handleClick = () => {
        setIsRotatedUp(!isRotatedUp);
        setFirstLoad(false)
        console.log(firstLoad);
        
    };

    return (
        <div className={`${styles.main} ${isRotatedUp ? styles.detailOpen : (firstLoad? styles.firsLoadAnimation : styles.detailClose)}`}>
            <div className={styles.order_info}>
                <p>{t('goods')}: {item.itemsCount}</p>
                <div className={styles["status_" + item.status]}>{t(`${item.status}`)}</div>
            </div>
            <div className={styles.order_detail}>
                <div className={styles.detail_item}>
                    <h3>{t('orderDate')}</h3>
                    <p>{item.date}</p>
                </div>
                <div className={styles.detail_item}>
                    <h3>{t('orderCost')}</h3>
                    <p>{item.cost} сум</p>
                </div>
                <div className={styles.detail_item}>
                    <h3>{t('address')}</h3>
                    <p>{item.address}</p>
                </div>
                <div className={styles.detail_item}>
                    <h3>{t('recipient')}</h3>
                    <p>{item.recipient.name}</p>
                    <p>{item.recipient.number}</p>
                </div>
            </div>
            <div className={`${styles.more_datail} ${isRotatedUp ? styles.rotateUp : styles.rotateDown}`} onClick={handleClick}>
                <p>{t('moreDetail')}</p>
                <SvgSelector className={"breadcrumb_icon"} id={"chevron-svg"} />
            </div>
            <div className={styles.order_items}>
                {item.data.map(el => (
                    <Fragment>
                        <PurchasesOrderItem item={el} />
                    </Fragment>
                ))}
            </div>
        </div>
    );
}
