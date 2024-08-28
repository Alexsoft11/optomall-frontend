import React from 'react'
import styles from "./TransportSection.module.scss"
import { useTranslations } from 'next-intl'

const TransportSection = () => {
  const t = useTranslations("Transport");
  return (
    <div className={`${styles.transport} container`}>
      <p className={styles.transport__text} data-aos="fade-up">
        {t("text_1")}
      </p>
      <p className={styles.transport__text} data-aos="fade-up" data-aos-duration="1100">{t("text_2")}</p>
      <ul className={styles.transport__list}>
        <li data-aos="fade-up" data-aos-duration="1300">100 {t("text_5")} = 9 000 {t("text_3")}</li>
        <li data-aos="fade-up" data-aos-duration="1400">200 {t("text_5")} = 18 000 {t("text_3")}</li>
        <li data-aos="fade-up" data-aos-duration="1500">300 {t("text_5")} = 27 000 {t("text_3")}</li>
        <li data-aos="fade-up" data-aos-duration="1600">500 {t("text_5")} = 45 000 {t("text_3")}</li>
        <li data-aos="fade-up" data-aos-duration="1700">700 {t("text_5")} = 63 000 {t("text_3")}</li>
        <li data-aos="fade-up" data-aos-duration="1800">1 {t("text_4")} = 90 000 {t("text_3")}</li>
      </ul>
      <p className={styles.transport__text2} data-aos="fade-up" data-aos-duration="2000">
        {t("text_6")}
      </p>
    </div>
  )
}

export default TransportSection