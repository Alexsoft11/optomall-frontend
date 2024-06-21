import React, { Fragment, useState } from 'react';
import styles from './MyReviewsPage.module.scss';
import { useTranslations } from 'next-intl';
import { Button } from 'antd';
import { MyReviewsDataInterface } from '../../interfaces';
import ReviewsItem from '../ReviewsItem';
import ReviewModal from '../ReviewModal/Index';

interface Props {
    data: MyReviewsDataInterface
}

export default function MyReviewsPage({ data }: Props) {
    const t = useTranslations('MyReviews')
    const [defautlSwitch, setDefautlSwitch] = useState(true)
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const setSwitch = () => {
        setDefautlSwitch(!defautlSwitch)
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.switch_buttons}>
                    <Button onClick={() => setSwitch()} className={`${defautlSwitch ? styles.active_switch : null}`}>
                        {t('waitForReview')}
                    </Button>
                    <Button onClick={() => setSwitch()} className={`${!defautlSwitch ? styles.active_switch : null}`}>
                        {t('reviewed')}
                    </Button>
                </div>
                <div className={styles.items_block}>
                    <div className={styles.items}>
                        {
                            data[defautlSwitch ? "waitForReview" : "reviewed"].map(el => (
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
