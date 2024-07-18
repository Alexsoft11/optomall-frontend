import React, { Fragment, useState } from 'react';
import styles from './PurchasesItem.module.scss';
import { PurchasesOrderInterface } from '../../interfaces';
import { useTranslations } from 'next-intl';
import SvgSelector from '$/assets/icons/SvgSelector';
import PurchasesOrderItem from '../PurchasesOrderItem';
import Image from 'next/image';


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
    };

    return (
        <div className={`${styles.main} ${isRotatedUp ? styles.detailOpen : (firstLoad ? styles.firsLoadAnimation : styles.detailClose)}`}>
            <div className={styles.order_info}>
                <p>{t('goods')}: {item.items.length}</p>
                <div className={styles.order_status}>
                    <div className={styles.flag_img}>
                        <Image src={'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/1024px-Flag_of_the_People%27s_Republic_of_China.svg.png'} alt='#' fill />
                    </div>
                    <div className={styles["status_" + item.status]}>
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
                <div className={styles.sub_state} style={{color:"#00AC26"}}>Оплата за доставку оплачен</div>
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
