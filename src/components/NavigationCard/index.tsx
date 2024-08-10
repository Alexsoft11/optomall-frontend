import React, { Fragment } from "react";
import styles from "./NavigationCard.module.scss";
import Link from "next/link";
import { LoadingSpinner } from "@/ui/Spin";
import { useTranslations } from "next-intl";
import { Subcategory } from "@/interfaces";

interface NavigationCardProps {
  data?: Subcategory[];
  setOpenModal?: any;
  isSubCategoryLoading?: boolean;
}

export default function NavigationCard({
  data,
  setOpenModal,
  isSubCategoryLoading,
}: NavigationCardProps) {
  const t = useTranslations("GLOBAL");
  const handleClose = () => {
    setOpenModal(null);
  };
  return (
    <div className={styles.navigationcard}>
      <div className={styles.navigationcard__inner}>
        {isSubCategoryLoading ? (
          <LoadingSpinner spinning={true} tip={"loadingData"} size="large" />
        ) : (
          !!data?.length &&
          data.map((el, idx: number) => (
            <>
              <h1 className={styles.navigationcard__title}>{el.name}</h1>
              <div key={idx} className={styles.navigationcard__list}>
                {el?.items?.map((item, idx: number) => (
                  <Fragment key={idx}>
                    <Link
                      onClick={handleClose}
                      href={`/search?value=${el.name} ${item.slug}&channel=taobao`}
                    >
                      {item.name}
                    </Link>
                  </Fragment>
                ))}
              </div>
            </>
          ))
        )}
      </div>
    </div>
  );
}
