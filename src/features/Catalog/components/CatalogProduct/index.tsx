import React from 'react'
import styles from './CatalogProduct.module.scss'
import SearchBtn from '@/components/SearchBtn'
import { CardsMockData } from '@/mockdata/Cards'
import Card from '@/components/Card'
import SvgSelector from '$/assets/icons/SvgSelector'

interface Props {
    data: any;
}

const CatalogProduct = ({ data }: Props) => {
  return (
    <>
        <div className={styles.catalog_product}>
            <div className="container">
                <div className={styles.catalog_product__inner}>
                    <div className={styles.catalog_product__top}>
                        <div className={styles.catalog_product__search}>
                            <SearchBtn/>
                        </div>
                        <div className={styles.catalog_product__btns}>
                            <button><span>Lorem, ipsum.</span> <SvgSelector id="sorting-svg"/></button>
                            <button><span>Lorem, ipsum.</span> <SvgSelector id="settings-svg"/></button>
                        </div>
                    </div>

                    <div className={styles.catalog_product__cards}>
                        {data?.map((el: any, idx: number) => (
                            <Card key={el.id} path={el.id} data={el} idx={idx} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default CatalogProduct