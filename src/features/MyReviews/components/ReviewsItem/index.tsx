import React, { Fragment } from 'react';
import styles from './ReviewsItem.module.scss';
import { MyReviewsReviewedInterface } from '../../interfaces';
import Image from 'next/image';
import { Button } from '@/ui';
import { useTranslations } from 'next-intl';
import { Rate } from 'antd';

interface Pros {
    item: MyReviewsReviewedInterface,
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ReviewsItem({ item, setModalIsOpen }: Pros) {
    const t = useTranslations('MyReviews')
    const handleClick = () => {
        setModalIsOpen(true)
    }


    return (
        <div className={styles.main}>
            <div className={styles.item_info}>
                <div className={styles.img}>
                    <Image width={98} height={98} alt='#' src={item.image} />
                </div>
                <div className={styles.item_text}>
                    <p>{item.name}</p>
                    <span>{item.company}</span>
                    <span>{item.date}</span>
                </div>
            </div>
            <div className={styles.bottom_block}>
                {!item.stars ? <Button onClick={handleClick} label={t('review')} /> : (
                    <div className={styles.reviewed_block}>
                        {item.stars ? <Rate value={item.stars} disabled /> : null}
                        {item.review ? <p>{item.review}</p> : null}
                        {!item.photos?.length ? null : (
                            <div className={styles.review_photos}>
                                {
                                    item.photos.map((el, index) => (
                                        <Fragment key={index}>
                                            <div className={styles.review_photos__img}>
                                                <Image width={60} height={60} alt='#' src={el} />
                                            </div>
                                        </Fragment>
                                    ))
                                }
                            </div>)}
                    </div>
                )}
            </div>
        </div>
    );
}
