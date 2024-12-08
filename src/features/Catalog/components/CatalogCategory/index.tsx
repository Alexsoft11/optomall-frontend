import React from "react";
import styles from "./CatalogCategory.module.scss";
import SearchBtn from "@/components/SearchBtn";
import Link from "next/link";
import { Collapse } from "antd";
import { useTranslations } from "next-intl";
import useProductStore from "@/store/useProductStore";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

const { Panel } = Collapse;

const CatalogCategory = () => {
  // const [overflowedItems, setOverflowedItems] = useState<{
  //   [key: string]: boolean;
  // }>({});
  const t = useTranslations("Navbar");
  const { categories } = useProductStore();
  const {
    query: { id },
  } = useRouter();

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
              {categories[parseInt(id as string)]?.subcategories?.map(
                (el, idx) => (
                  <Panel
                    header={
                      <Link
                        href={`/search?value=${el.name}&provider=1688&catId=${el.id}`}
                      >
                        {el.name}
                      </Link>
                    }
                    key={idx}
                  >
                    <div>
                      {el.items?.map((subcategory, subIdx) => (
                        <ul className={styles.categories__ul} key={subIdx}>
                          {/* <h4 className={styles.sub_title}> */}
                          <Link
                            href={`/search?value=${subcategory.name}&provider=1688&catId=${subcategory.id}`}
                          >
                            {subcategory.name}
                          </Link>
                          {/* </h4> */}
                          {/* <ul className={styles.categories__ul}>
                          {subcategory.items.map((item, itemIdx) => (
                            <Link
                              href={`/search?value=${item.name}&provider=1688&catId=${item.id}`}
                              key={itemIdx}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </ul> */}
                        </ul>
                      ))}
                    </div>
                  </Panel>
                )
              )}
            </Collapse>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogCategory;
