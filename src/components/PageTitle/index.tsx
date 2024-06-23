import React, { useEffect } from "react";
import styles from "./PageTitle.module.scss";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

export default function PageTitle() {
  const t = useTranslations("GLOBAL");
  const router = useRouter();
  let pathArr = router.pathname.split("/");
  let title = "";

  function findPathName(step: number = -1) {
    const pathSegment = pathArr.at(step) as string;
    if (!/\[[^\]]+\]/.test(pathSegment)) {
        title = pathSegment;
    } else {
        findPathName(step - 1);
    }
}


  useEffect(() => {
    findPathName();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.main}>
      <h1>{t(title)}</h1>
    </div>
  );
}
