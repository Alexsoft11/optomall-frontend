import React from 'react'
import styles from './CatalogDetail.module.scss'
import Link from 'next/link'
import SvgSelector from '$/assets/icons/SvgSelector'

const CatalogDetail = () => {
  return (
    <>
      <div className={styles.catalog_detail}>
        <div className='container'>
          <div className={styles.catalog_detail__inner}>
            <h2 className={styles.catalog_detail__title}>Смартфоны</h2>

            <div className={styles.catalog_detail__links}>
              <Link href="" className={styles.catalog_detail__link}>
                <p>Безпроводные зарядные устройства</p>
                <SvgSelector id="arrow-right-svg"/>
              </Link>

              <Link href="" className={styles.catalog_detail__link}>
                <p>Сетевые зарядные устройства</p>
                <SvgSelector id="arrow-right-svg"/>
              </Link>

              <Link href="" className={styles.catalog_detail__link}>
                <p>Универсальные зарядные устройства</p>
                <SvgSelector id="arrow-right-svg"/>
              </Link>

              <Link href="" className={styles.catalog_detail__link}>
                <p>Чехлы-аккумуляторы</p>
                <SvgSelector id="arrow-right-svg"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CatalogDetail