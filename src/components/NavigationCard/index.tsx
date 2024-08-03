import React, { Fragment } from "react";
import styles from "./NavigationCard.module.scss";
import Link from "next/link";
import { LoadingSpinner } from "@/ui/Spin";
import { useTranslations } from "next-intl";

interface NavigationCardProps {
  data?: any;
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
            data.map((el: any, idx: number) => (
              <>
                <h1 className={styles.navigationcard__title}>{el.name}</h1>
                <div key={idx} className={styles.navigationcard__list}>
                  {el?.items?.map((item: any, idx: number) => (
                    <Fragment key={idx}>
                      <Link
                        onClick={handleClose}
                        href={`/search?query=${item}&channel=taobao`}
                      >
                        {item}
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
