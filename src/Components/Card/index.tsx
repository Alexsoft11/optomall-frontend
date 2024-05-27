import React from 'react'
import { CardInterface } from '../Types';
import styles from './Card.module.scss'
import Image from 'next/image'

interface CardProps {
    data: CardInterface[];
}

const Card = ({ data }: CardProps) => {
  return (
    <>
        {data.map((item, idx) => (
            <div key={idx} className={styles.card}>
                <div className={styles.card__image}>
                    <Image src={item.imageUrl} alt="img"/>
                </div>

                <h2 className={styles.card__title}>{item.title}</h2>

                <p className={styles.card__price}>{item.price}</p>
            </div>
        ))}
    </>
  )
}

export default Card