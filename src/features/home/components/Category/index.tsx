import React, { useEffect, useState } from "react";
import styles from "./Category.module.scss";
import Image from "next/image";
import Link from "next/link";
import { CategoryInterface } from "@/interfaces";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { Tooltip } from "antd";

const Category = () => {
  const [CatalogTabsData, setCatalogTabsData] = useState<CategoryInterface[]>(
    []
  );
  const [overflowedItems, setOverflowedItems] = useState<{
    [key: string]: boolean;
  }>({});

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
      setOverflowedItems((prev) => ({ ...prev, [id]: true }));
    } else {
      setOverflowedItems((prev) => ({ ...prev, [id]: false }));
    }
  };
  return (
    <>
      <div className={styles.category}>
        <div className="container">
          <div className={styles.category__inner}>
            <div className={styles.category__left}>
              {CatalogTabsData.slice(0, 4).map((item: any, idx: number) => (
                <Link key={idx} href={`catalog/${item.id}`}>
                  <div className={styles.category__card}>
                    <Tooltip
                      overlayClassName="tooltip-white"
                      title={overflowedItems[item.id] ? item.name : ""}
                    >
                      <p
                        className={styles.category__text}
                        ref={(el) => {
                          if (el) {
                            checkOverflow(el, item.id);
                          }
                        }}
                      >
                        {item.name}
                      </p>
                    </Tooltip>
                    <Image src={item.imageUrl} alt="img" />
                  </div>
                </Link>
              ))}
            </div>

            <div className={styles.category__right}>
              <h2>Посмотреть категорию</h2>
              <Link href="/catalog" className={styles.category__btn}>
                Показать ещё
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
