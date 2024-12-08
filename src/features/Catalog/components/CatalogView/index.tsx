import React from "react";
import styles from "./Catalog.module.scss";
import SearchBtn from "@/components/SearchBtn";
import Image from "next/image";
import Link from "next/link";
import useProductStore from "@/store/useProductStore";

const CatalogView = () => {
  const { categories } = useProductStore();

  return (
    <>
      <div className={styles.categories}>
        <div className="container">
          <div className={styles.categories__inner}>
            <h1 className={styles.categories__title}>Catalog</h1>

            <div className={styles.categories__search}>
              <SearchBtn />
            </div>

            <div className={styles.categories__cards}>
              {categories.map((item, idx) => (
                <Link
                  key={idx}
                  href={`/catalog/${idx}`}
                  className={styles.categories__card}
                >
                  <div className={styles.categories__card_image}>
                    <Image
                      src={item.image_url}
                      width={100}
                      height={100}
                      alt="img"
                    />
                  </div>
                  <p>{item.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CatalogView;
