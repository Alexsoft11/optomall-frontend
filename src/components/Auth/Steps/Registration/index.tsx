import React from "react";
import styles from "./Registration.module.scss";
import { Tabs } from "antd";
import GoogleButton from "../../GoogleButton";
import { useTranslations } from "next-intl";
import GoToBack from "@/components/GoToBack";
import RegisterWithPhone from "./registerPhone";
import RegisterWithEmail from "./registerEmail";
interface Props {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Registration({ setModalIsOpen }: Props) {
  const t = useTranslations("");

  const tabItems = [
    {
      key: "1",
      label: t("Auth.registerWithPhone"),
      children: <RegisterWithPhone />,
    },
    {
      key: "2",
      label: t("Auth.registerWithEmail"),
      children: <RegisterWithEmail setModalIsOpen={setModalIsOpen} />,
    },
  ];

  return (
    <div className={styles.main}>
      <GoToBack pathArr={[{ title: "registration", path: "" }]} />
      <h1>{t("Auth.regist")}</h1>
      <p className={styles.desc}>{t("Auth.registrationDescription")}</p>
      <div className={styles.form}>
        <Tabs
          className={`${styles.tabs} register-tab`}
          defaultActiveKey="1"
          items={tabItems}
          destroyInactiveTabPane={true}
        />
        <GoogleButton />
      </div>
    </div>
  );
}
