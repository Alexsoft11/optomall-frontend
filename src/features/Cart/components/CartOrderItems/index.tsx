import React, { Fragment } from 'react';
import styles from './CartOrderItems.module.scss';
import { CartOrderDataInterface } from '../../interface';
import { useTranslations } from 'next-intl';


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CartOrderItem from '../CartOrderItem';

interface Props {
    data: CartOrderDataInterface
}

export default function CartOrderItems({ data }: Props) {
    const t = useTranslations('Cart')

    return (
        <div className={styles.main}>
            <div className={styles.items_info}>
                <p className={styles.itemsCount}>{t('item')} {data.itemsCount} </p>
                <p>{data.date}</p>
            </div>
            <div className={styles.swiper}>
                <Swiper
                    className={styles.swiper}
                    slidesPerView={10}
                    spaceBetween={10}
                    breakpoints={{
                        3000: {
                          slidesPerView: 10,
                          spaceBetween: 15,
                        },
                        1000: {
                          slidesPerView: 7,
                          spaceBetween: 10,
                        },
                        840: {
                          slidesPerView: 6,
                          spaceBetween: 10, 
                        },
                        520: {
                          slidesPerView: 4,
                          spaceBetween: 10,
                        },
                        100: {
                          slidesPerView: 2,
                          spaceBetween: 10,
                        },
                      }}
                >
                    {data.data.map(el => (
                        <SwiperSlide key={el.id}>
                            <CartOrderItem item={el} />
                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>

        </div>
    );
}
