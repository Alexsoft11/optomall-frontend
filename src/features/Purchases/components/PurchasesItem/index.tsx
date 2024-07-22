import React, { Fragment, useState } from 'react';
import styles from './PurchasesItem.module.scss';
import { PurchasesOrderInterface } from '../../interfaces';
import { useLocale, useTranslations } from 'next-intl';
import SvgSelector from '$/assets/icons/SvgSelector';
import PurchasesOrderItem from '../PurchasesOrderItem';
import Image from 'next/image';
import { LanguageStringIntergace } from '@/interfaces';


interface Props {
    item: PurchasesOrderInterface
}

export default function PurchasesItem({ item }: Props) {
    const t = useTranslations('Purchases')
    const locale = useLocale();

    function hexToRgba(hex: string, opacity: number) {
        if (!hex) return
        hex = hex.replace('#', '');
        hex.toLocaleLowerCase();
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    const [isRotatedUp, setIsRotatedUp] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true)
    const handleClick = () => {
        setIsRotatedUp(!isRotatedUp);
        setFirstLoad(false)
    };

    return (
        <div className={`${styles.main} ${isRotatedUp ? styles.detailOpen : (firstLoad ? styles.firsLoadAnimation : styles.detailClose)}`}>
            <div className={styles.order_info}>
                <p>{t('goods')}: {item.items.length}</p>
                <div className={styles.order_status}>
                    <div className={styles.flag_img}>
                        <Image src={item.country} alt='flag' fill />
                    </div>
                    <div className={styles["status_" + item.status]} style={{ color: item.status_color, backgroundColor: hexToRgba(item.status_color, 0.2) }}>
                        {t(`${item.status}`)}
                    </div>
                </div>
            </div>
            <div className={styles.order_detail}>
                <div className={styles.detail_item}>
                    <h3>{t('orderDate')}</h3>
                    <p>{item.created_at}</p>
                </div>
                <div className={styles.detail_item}>
                    <h3>{t('orderCost')}</h3>
                    <p>{item.total_price} сум</p>
                </div>
                <div className={styles.detail_item}>
                    <h3>{t('address')}</h3>
                    <p>{item.location_name}</p>
                </div>
                <div className={styles.detail_item}>
                    <h3>{t('recipient')}</h3>
                    <p>{item.user_name}</p>
                    <p>{item.user_phone}</p>
                </div>
                <div className={styles.detail_item}>
                    <h3>{t('cargo')}</h3>
                    <p>{`${item.kg} ${t('currency')}` || t('calculated') }</p>
                </div>
                <div className={styles.sub_status} style={{ color: item.substatus_color }}>{item.substatus[locale as keyof LanguageStringIntergace] || 'sub ststus undefiened :('}</div>
            </div>
            <div className={`${styles.more_datail} ${isRotatedUp ? styles.rotateUp : styles.rotateDown}`} onClick={handleClick}>
                <p>{t('moreDetail')}</p>
                <SvgSelector className={"breadcrumb_icon"} id={"chevron-svg"} />
            </div>
            <div className={styles.order_items}>
                {item.items.map(el => (
                    <Fragment key={el.id}>
                        <PurchasesOrderItem item={el} />
                    </Fragment>
                ))}
            </div>
        </div>
    );
}
