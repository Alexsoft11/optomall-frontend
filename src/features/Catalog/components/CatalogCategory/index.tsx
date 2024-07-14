import React, { useEffect, useRef, useState } from 'react';
import styles from './CatalogCategory.module.scss';
import SearchBtn from '@/components/SearchBtn';
import Image from 'next/image';
import Link from 'next/link';
import useQueryApiClient from '@/utils/useQueryApiClient';
import { CategoryCatalogInterface } from '@/interfaces';
import { Tooltip } from 'antd';

const CatalogCategory = () => {
  const [CatalogTabsData, setCatalogTabsData] = useState<CategoryCatalogInterface[]>([]);
  const [overflowedItems, setOverflowedItems] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    getCategoryData();
  }, []);

  const { appendData: getCategoryData } = useQueryApiClient({
    request: {
      url: "categories-from-taobao",
      method: "GET",
    },
    onSuccess(res) {
      setCatalogTabsData(res.categories);
    },
  });

  const checkOverflow = (element: HTMLElement, id: string) => {
    if (element.scrollHeight > element.clientHeight) {
      setOverflowedItems(prev => ({ ...prev, [id]: true }));
    } else {
      setOverflowedItems(prev => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className={styles.categories}>
      <div className='container'>
        <div className={styles.categories__inner}>
          <h1 className={styles.categories__title}>Catalog</h1>
          <div className={styles.categories__search}>
            <SearchBtn />
          </div>
          <div className={styles.categories__cards}>
            {
              CatalogTabsData.map((item, idx) => (
                <Link key={idx} href={`/catalog/${item.id}`} className={styles.categories__card}>
                  <div className={styles.categories__card_image}>
                    <Image src={item.image} width={1000} height={1000} alt="img" />
                  </div>
                  <Tooltip
                    overlayClassName="tooltip-white"
                    title={overflowedItems[item.id] ? item.name : ""}
                  >
                    <p
                      className={styles.categories__text}
                      ref={(el) => {
                        if (el) {
                          checkOverflow(el, item.id);
                        }
                      }}
                    >
                      {item.name}
                    </p>
                  </Tooltip>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogCategory;
