import React from 'react'
import styles from './CatalogCategory.module.scss'
import SearchBtn from '@/components/SearchBtn'
import Image from 'next/image'
import { CatalogCategoriesData } from '@/mockdata/CatalogTabs'
import Link from 'next/link'

const CatalogCategory = () => {
  return (
    <>
        <div className={styles.categories}>
            <div className='container'>
                <div className={styles.categories__inner}>
                    <h1 className={styles.categories__title}>Catalog</h1>

                    <div className={styles.categories__search}>
                        <SearchBtn/>
                    </div>

                    <div className={styles.categories__cards}>
                        {
                            CatalogCategoriesData.map((item, idx) => (
                                <Link key={idx} href={`/catalog/${item.id}`} className={styles.categories__card}>
                                    <div className={styles.categories__card_image}>
                                        <Image src={item.imageUrl} alt="img"/>
                                    </div>
                                    <p>{item.title}</p>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default CatalogCategory