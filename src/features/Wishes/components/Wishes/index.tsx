import React, { useState } from 'react'
import styles from './Wishes.module.scss'
import Card from '@/components/Card'
import { CardInterface } from '@/interfaces';

interface Props {
    wishesData: CardInterface[];
}

const Wishes = ({ wishesData }: Props) => {
    const [isShowLiked, setIsShowLiked] = useState(false)
    console.log(wishesData)
  return (
    <div className={styles.wishes}>
        <div className='container'>
            <div className={styles.wishes__inner}>
                <div className={styles.wishes__top}>
                    <h2>Yoqkanlar</h2>
                </div>

                <div className={styles.wishes__cards}>
                    {/* {wishesData.map((item, idx) => (
                        <Card data={item} idx={idx} isShowLiked={isShowLiked}/>
                    ))} */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Wishes