import React from 'react'
import styles from './Products.module.scss'
import Card from '../Card';

interface Props {
    data: any;
}

const Products = ({ data }: Props) => {
  return (
    <div className={styles.products}>
        {data?.map((el: any, idx: number) => (
            <Card key={idx} data={el} />
        ))}
    </div>
  )
}

export default Products