import React from 'react';
import { Collapse } from 'antd';
import styles from "./Customs.module.scss"
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const { Panel } = Collapse;

const Custom = () => {
    const t = useTranslations("Custom");
  return (
    <div className={`${styles.customs} container`}>
        <h2 className={styles.customs__title} data-aos="fade-up" data-aos-duration="1000">{t("title")}</h2>
        <p data-aos="fade-up" data-aos-duration="1200">{t("payment")}</p>
        <ul className={styles.customs__desc}>
            <li data-aos="fade-up" data-aos-duration="1500">{t("text_1")}</li>
            <li data-aos="fade-up" data-aos-duration="1700">{t("text_2")}</li>
            <li data-aos="fade-up" data-aos-duration="1900">{t("text_3")}</li>
        </ul>
    </div>
  );
};

export default Custom;
