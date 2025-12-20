import React, { useEffect, useState } from "react";
import styles from "./Category.module.scss";
import Image from "next/image";
import Link from "next/link";
import { CategoryInterface } from "@/interfaces";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { Tooltip } from "antd";
import useProductStore from "@/store/useProductStore";
import CustomImage from "@/components/CustomImage";
import { useTranslations } from "next-intl";

const Category = () => {
  const { categories } = useProductStore();
  const t = useTranslations("Home");

  const [overflowedItems, setOverflowedItems] = useState<{
    [key: string]: boolean;
  }>({});


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
              {categories.slice(0, 4).map((item: any, idx: number) => (
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
                    <CustomImage src={item.imageUrl} alt="img" useProxy={false} />
                  </div>
                </Link>
              ))}
            </div>

            <div className={styles.category__right}>
              <h2>{t("view_category")}</h2>
              <Link href="/catalog" className={styles.category__btn}>
                {t("show_more")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
