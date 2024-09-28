import React, { useEffect, useRef, useState } from "react";
import styles from "./CatalogCategory.module.scss";
import SearchBtn from "@/components/SearchBtn";
import Image from "next/image";
import Link from "next/link";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { CategoryInterface } from "@/interfaces";
import { Collapse, Tooltip } from "antd";
import { useTranslations } from "next-intl";
import SvgSelector from "$/assets/icons/SvgSelector";
import { useRouter } from "next/router";

const { Panel } = Collapse;

const CatalogCategory = () => {
  const [CatalogTabsData, setCatalogTabsData] = useState<CategoryInterface[]>(
    []
  );
  const [overflowedItems, setOverflowedItems] = useState<{
    [key: string]: boolean;
  }>({});
  const t = useTranslations("Navbar");
  const router = useRouter();

  useEffect(() => {
    getCategoryData({ lang: router.locale });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.locale]);

  const { appendData: getCategoryData } = useQueryApiClient({
    request: {
      url: `categories-from-taobao`,
      method: "GET",
      disableOnMount: true,
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
    <div className={styles.categories}>
      <div className="container">
        <div className={styles.categories__inner}>
          <h1 className={styles.categories__title}>{t("catalog")}</h1>
          <div className={styles.categories__search}>
            <SearchBtn />
          </div>
          <div className={styles.categories__cards}>
            <Collapse expandIconPosition="end" className="catalog_select">
              {CatalogTabsData.map((el, idx) => (
                <Panel header={el.name} key={idx}>
                  <div>
                    {el.subcategories.map((subcategory, subIdx) => (
                      <div key={subIdx}>
                        <h4 className={styles.sub_title}>
                          <Link
                            href={`/search?value=${subcategory.name}&provider=1688&catId=${subcategory.id}`}
                          >
                            {subcategory.name}
                          </Link>
                        </h4>
                        <ul className={styles.categories__ul}>
                          {subcategory.items.map((item, itemIdx) => (
                            <Link
                              href={`/search?value=${item.name}&provider=1688&catId=${item.id}`}
                              key={itemIdx}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Panel>
              ))}
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogCategory;
