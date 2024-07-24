import React, { Fragment, useState } from 'react';
import styles from './ReviewsItem.module.scss';
import { MyReviewsReviewedInterface } from '../../interfaces';
import Image from 'next/image';
import { Button } from '@/ui';
import { useTranslations } from 'next-intl';
import { Rate } from 'antd';
import ReviewModal from '../ReviewModal/Index';

interface Pros {
    item: MyReviewsReviewedInterface,
    setCommentData: React.Dispatch<React.SetStateAction<FormData | undefined>>
}

export default function ReviewsItem({ item, setCommentData }: Pros) {
    const t = useTranslations('MyReviews')
    const [modalIsOpen, setModalIsOpen] = useState(false);
    

    const handleClick = () => {
        setModalIsOpen(true)
    }



    return (
        <div className={styles.main}>
            <div className={styles.item_info}>
                <div className={styles.img}>
                    <Image width={98} height={98} alt='#' src={item.image_url} />
                </div>
                <div className={styles.item_text}>
                    <p>{item.name}</p>
                    {/* <span>{item.company}</span> */}
                    <span>null</span>
                    <span>{item.date}</span>
                </div>
            </div>
            <div className={styles.bottom_block}>
                {!item.stars ? <Button onClick={handleClick} label={t('review')} /> : (
                    <div className={styles.reviewed_block}>
                        {item.stars ? <Rate className={styles.rate} value={item.stars} disabled /> : null}
                        {item.comment ? <p>{item.comment}</p> : null}
                        {!item.photos?.length ? null : (
                            <div className={styles.review_photos}>
                                {item.photos.map((el, index) => (
                                    <Fragment key={index}>
                                        <div className={styles.review_photos__img}>
                                            <Image alt='#' fill src={el} />
                                        </div>
                                    </Fragment>
                                ))
                                }
                            </div>)}
                    </div>
                )}
            </div>
            <ReviewModal setCommentData={setCommentData} productId={item.id} modalIsOpen={modalIsOpen} onCancel={setModalIsOpen} />
        </div>
    );
}
