import React, { Fragment } from 'react'
import styles from './NavigationCard.module.scss'
import Link from 'next/link'

interface NavigationCardProps {
    data?: any;
    setOpenModal?: any;
}

export default function NavigationCard({data, setOpenModal}: NavigationCardProps) {
    const handleClose = () => {
        setOpenModal(null)
    }
  return ( 
    <div className={styles.navigationcard}>
        <div className={styles.navigationcard__inner}>
            {/* <h1 className={styles.navigationcard__title}>{data.title}</h1> */}

            <div className={styles.navigationcard__list}>
                {
                    data?.sub_categories?.map((item: any, idx: number) => (
                        <Fragment key={idx}>
                            <Link onClick={handleClose} href={`/catalog/product/${item.id}`}>{item.name}</Link>
                        </Fragment>
                    ))
                }
            </div>
        </div>
    </div>
  )
}