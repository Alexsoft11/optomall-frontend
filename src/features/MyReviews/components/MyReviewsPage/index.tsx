import React, { Fragment, useEffect, useState } from 'react';
import styles from './MyReviewsPage.module.scss';
import { useTranslations } from 'next-intl';
import { Button, message } from 'antd';
import ReviewsItem from '../ReviewsItem';
import ReviewModal from '../ReviewModal/Index';
import { useRouter } from 'next/router';
import { MyReviewsReviewedInterface } from '../../interfaces';
import useQueryApiClient from '@/utils/useQueryApiClient';
import { data } from 'yandex-maps';

interface Props {
    data: MyReviewsReviewedInterface[]
}

export default function MyReviewsPage({ data }: Props) {    
    const [commentData, setCommentData] = useState<FormData>()
    const [dataClone, setDataClone] = useState<MyReviewsReviewedInterface[] | []>(data)

    const t = useTranslations('MyReviews')
    const router = useRouter();

    const changeRout = (filter: string) => {
        router.push(`/my-reviews?filter=${filter}`)
    }

    useEffect(() => {
        if (!commentData) return        
        // createData(commentData)
    }, [commentData])

    useEffect(() => setDataClone(data), [data])

    const { appendData: createData } = useQueryApiClient({
        request: {
            url: "post-comment",
            method: "POST",
            disableOnMount: true,
        },
        onSuccess(res) {
            setDataClone(res.data)
            message.success(t('commentAdded'), 2)
        },
    });

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
                            dataClone.map(el => (
                                <Fragment key={el.id}>
                                    <ReviewsItem item={el} setCommentData={setCommentData} />
                                </Fragment>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
