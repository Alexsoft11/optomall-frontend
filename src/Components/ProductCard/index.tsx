import React from 'react'
import { ProductCardInterface } from '../Types';
import styles from './ProductCard.module.scss'
import Image from 'next/image'

interface ProductCardProps {
    data: ProductCardInterface[];
}

const ProductCard = ({ data }: ProductCardProps) => {
  return (
    <>
        {data.map((item, index) => (
            <div key={index} className={styles.productcard}>
                <div className={styles.productcard__image}>
                    <Image src={item.imageUrl} alt="img"/>
                </div>

                <h2 className={styles.productcard__title}>{item.title}</h2>

                <p className={styles.productcard__price}>{item.price}</p>
            </div>
        ))}
    </>
  )
}

export default ProductCard