import React, { Fragment, useState } from 'react';
import styles from './MyReviewsPage.module.scss';
import { useTranslations } from 'next-intl';
import { Button } from 'antd';
import { MyReviewsDataInterface } from '../../interfaces';
import ReviewsItem from '../ReviewsItem';
import ReviewModal from '../ReviewModal/Index';
import { useRouter } from 'next/router';

interface Props {
    data: MyReviewsDataInterface
}

export default function MyReviewsPage({ data }: Props) {
    const t = useTranslations('MyReviews')
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const router = useRouter();

    const changeRout = (filter: string) => {
        router.push(`/my-reviews?filter=${filter}`)
    }

    return (
        <>
            <div className={styles.main}>
                <div className={`${styles.switch_buttons} ${styles["activeChild_" + router.query.filter]}`}>
                    <Button onClick={() => changeRout('commented')} >
                        {t('waitForReview')}
                    </Button>
                    <Button onClick={() => changeRout('non_commented')}>
                        {t('reviewed')}
                    </Button>
                </div>
                <div className={styles.items_block}>
                    <div className={styles.items}>
                        {
                            data.waitForReview.map(el => (
                                <Fragment key={el.id}>
                                    <ReviewsItem item={el} setModalIsOpen={setModalIsOpen} />
                                </Fragment>
                            ))
                        }
                    </div>
                </div>
            </div>
            <ReviewModal modalIsOpen={modalIsOpen} onCancel={setModalIsOpen} />
        </>
    );
}
