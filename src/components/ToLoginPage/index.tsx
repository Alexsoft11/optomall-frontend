import React from "react";
import styles from "./ToLoginPage.module.scss";
import { Button } from "@/ui";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useJwt } from "@/utils/useJwt";

const ToLoginPage = () => {
  const t = useTranslations("ToLoginPage");
  const { query, push, asPath } = useRouter();

  const toAuth = (path: string) => {
    localStorage.setItem("backUrl", asPath);
    push(path);
  };

  return (
    <div className={styles.tologin}>
      <div className={styles.tologin__inner}>
        <h2>{t("title")}</h2>
        <p>{t("text")}</p>
        <div className={styles.tologin__btns}>
          <Button
            onClick={() => toAuth(`/auth?step=signin`)}
            size="large"
            className="generalbtn"
            label={t("btn_access")}
          />

          <Button
            onClick={() => toAuth(`/auth?step=signUp`)}
            size="large"
            className="line_btn"
            label={t("btn_regist")}
          />
        </div>
      </div>
    </div>
  );
};

export default ToLoginPage;
