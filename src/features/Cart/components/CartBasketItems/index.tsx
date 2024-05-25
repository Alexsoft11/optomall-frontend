import React, { Fragment } from 'react';
import styles from './CartBasketItems.module.scss';
import { CartMockdata } from '@/mockdata/Cart';
import { CartBasketItem } from '@/features/Cart';
import { useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function CartBasketItems() {
    const t = useTranslations('Cart')

    return (
        <div className={styles.main}>
            <p className={styles.items_count}>{t('item')} {CartMockdata.data.length}</p>
            <div className={styles.swiper}>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={10}
                    mousewheel={true}
                    direction="vertical"
                    scrollbar={{ draggable: true }}
                >
                    {CartMockdata.data.map(el => (
                        <SwiperSlide key={el.id}>
                            <CartBasketItem item={el} />
                        </SwiperSlide>
                    ))}

                </Swiper>

            </div>
        </div>
    );
}
