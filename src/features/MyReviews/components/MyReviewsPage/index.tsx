import React, { Fragment, useState } from 'react';
import styles from './MyReviewsPage.module.scss';
import { useTranslations } from 'next-intl';
import { Button } from 'antd';
import ReviewsItem from '../ReviewsItem';
import ReviewModal from '../ReviewModal/Index';
import { useRouter } from 'next/router';
import { MyReviewsReviewedInterface } from '../../interfaces';

interface Props {
    data: MyReviewsReviewedInterface[]
}

export default function MyReviewsPage({ data }: Props) {
    
    const t = useTranslations('MyReviews')
    const router = useRouter();

    const changeRout = (filter: string) => {
        router.push(`/my-reviews?filter=${filter}`)
    }

    return (
        <>
            <div className={styles.main}>
                <div className={`${styles.switch_buttons} ${styles["activeChild_" + router.query.filter]}`}>
                    <Button onClick={() => changeRout('non_commented')} >
                        {t('waitForReview')}
                    </Button>
                    <Button onClick={() => changeRout('commented')}>
                        {t('reviewed')}
                    </Button>
                </div>
                <div className={styles.items_block}>
                    <div className={styles.items}>
                        {
                            data.map(el => (
                                <Fragment key={el.id}>
                                    <ReviewsItem item={el} />
                                </Fragment>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
