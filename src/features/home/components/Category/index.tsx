import React from 'react'
import styles from './Category.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { CardsCategory } from '@/mockdata/Cards'

const Category = () => {
  return (
    <>
        <div className={styles.category}>
            <div className='container'>
              <div className={styles.category__inner}>
                <div className={styles.category__left}>
                  {
                    CardsCategory.slice(0, 4).map((item, idx) => (
                      <Link key={idx} href={item.link}>
                        <div className={styles.category__card}>
                          <p>{item.title}</p>
                          <Image src={item.imageUrl} alt="img"/>
                        </div>
                      </Link>
                    ))
                  }
                </div>

                <div className={styles.category__right}>
                  <h2>Посмотреть категорию</h2>
                  <button className={styles.category__btn}>Показать ещё</button>
                </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default Category