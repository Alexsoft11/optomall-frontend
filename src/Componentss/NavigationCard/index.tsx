import React from 'react'
import styles from './NavigationCard.module.scss'
import Link from 'next/link'

interface NavigationCardProps {
    data?: any;
}

const NavigationCard = ({data}: NavigationCardProps) => {
  return (
    <>
        <div className={styles.navigationcard}>
            <div className={styles.navigationcard__inner}>
                <h1 className={styles.navigationcard__title}>{data.title}</h1>

                <div className={styles.navigationcard__list}>
                    {
                        data?.links.map((item: any, idx: number) => (
                            <Link key={idx} href={item.link}>{item.text}</Link>
                        ))
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default NavigationCard