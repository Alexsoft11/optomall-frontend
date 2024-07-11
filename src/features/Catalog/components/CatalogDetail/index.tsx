import React from 'react'
import styles from './CatalogDetail.module.scss'
import Link from 'next/link'
import SvgSelector from '$/assets/icons/SvgSelector'

interface Props {
  data: any;
}

const CatalogDetail = ({ data }: Props) => {
  
  return (
    <>
      <div className={styles.catalog_detail}>
        <div className='container'>
          <div className={styles.catalog_detail__inner}>
            {/* <h2 className={styles.catalog_detail__title}>Смартфоны</h2> */}

            <div className={styles.catalog_detail__links}>
              {
                data?.map((item: any, idx: number) => (
                  <Link key={idx} href={`/catalog/product/${item.id}`} className={styles.catalog_detail__link}>
                    <p>{item.name}</p>
                    <SvgSelector id="arrow-right-svg"/>
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

export default CatalogDetail