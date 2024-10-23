import styles from "./AdditionalCategory.module.scss";
import React from "react";
import { IAdditonalCategory } from "@/interfaces";
import Image from "next/image";
import AditionalProductList from "./AditionalProductList";
import Link from "next/link";

interface Props {
  categories: IAdditonalCategory[];
  enableLink?: boolean;
}

const AdditionalCategory = ({ categories, enableLink = false }: Props) => {
  return (
    <div className={styles.additional_category}>
      {categories?.map((item: IAdditonalCategory, idx: number) => (
        <div key={idx} className={styles.products__categories_inner}>
          <div
            className={styles.products__banner}
            data-aos="fade-up"
            data-aos-duration="600"
          >
            {enableLink ? (
              <Link href={`/hot-categories/${item.id}`}>
                <Image
                  src={item?.image}
                  width={10000}
                  height={10000}
                  alt="banner img"
                  style={{ cursor: "pointer" }}
                />
              </Link>
            ) : (
              <Image
                src={item?.image}
                width={10000}
                height={10000}
                alt="banner img"
              />
            )}
          </div>
          <AditionalProductList category={item} />
        </div>
      ))}
    </div>
  );
};

export default AdditionalCategory;
