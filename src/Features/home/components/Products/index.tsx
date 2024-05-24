import React from 'react'
import styles from './Products.module.scss'
import { CustomTabs } from '@/ui/Tabs'
import { ProductImage } from '$/assets/images'
import ProductCard from '@/Components/ProductCard'
import { ProductCardInterface } from '@/Components/Types'
import TabPane from 'antd/es/tabs/TabPane'

const Products = () => {
    const dataCards: ProductCardInterface[] = [
        {
            title: 'Lorem ipsum is dolor set amet',
            price: 'UZS 1650',
            imageUrl: ProductImage,
        },
        {
            title: 'Lorem ipsum is dolor set amet',
            price: 'UZS 1650',
            imageUrl: ProductImage,
        },
        {
            title: 'Lorem ipsum is dolor set amet',
            price: 'UZS 1650',
            imageUrl: ProductImage,
        },
        {
            title: 'Lorem ipsum is dolor set amet',
            price: 'UZS 1650',
            imageUrl: ProductImage,
        },
        {
            title: 'Lorem ipsum is dolor set amet',
            price: 'UZS 1650',
            imageUrl: ProductImage,
        },
        {
            title: 'Lorem ipsum is dolor set amet',
            price: 'UZS 1650',
            imageUrl: ProductImage,
        },
    ]

    const tabData = [
        { 
            key: '1', 
            tab: 'Распродажа',
            content: ''
            },
        { 
            key: '2', 
            tab: 'Топ-товары',
            content: ''
        },
        { 
            key: '3', 
            tab: 'Рекомендуем вам',
            content: ''
        },
    ]
  return (
    <>
        <div className={styles.products}>
            <div className='container'>
                <div className={styles.products__inner}>
                    <div className={styles.products__top}>
                        <CustomTabs
                            className='products_tab'
                        >
                            {tabData.map(tab => (
                                <TabPane
                                    key={tab.key}
                                    tab={tab.tab}
                                    className={styles.products__item}
                                >
                                </TabPane>
                            ))}
                        </CustomTabs>
                    </div>

                    <div className={styles.products__cards}>
                        <ProductCard data={dataCards}/>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Products