import React from "react";
import styles from "./CatalogCategory.module.scss";
import SearchBtn from "@/components/SearchBtn";
import Link from "next/link";
import { Collapse } from "antd";
import { useTranslations } from "next-intl";
import useProductStore from "@/store/useProductStore";

const { Panel } = Collapse;

const CatalogCategory = () => {

  // const [overflowedItems, setOverflowedItems] = useState<{
  //   [key: string]: boolean;
  // }>({});
  const t = useTranslations("Navbar");
  const { categories } = useProductStore();
 
  // const checkOverflow = (element: HTMLElement, id: string) => {
  //   if (element.scrollHeight > element.clientHeight) {
  //     setOverflowedItems((prev) => ({ ...prev, [id]: true }));
  //   } else {
  //     setOverflowedItems((prev) => ({ ...prev, [id]: false }));
  //   }
  // };

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
              {categories.map((el, idx) => (
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
