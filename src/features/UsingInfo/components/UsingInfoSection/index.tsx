import React from 'react'
import { Collapse } from 'antd';
import styles from "./Using.module.scss"
import Image from 'next/image';
import { UsingImg1, UsingImg10, UsingImg2, UsingImg3, UsingImg4, UsingImg5, UsingImg6, UsingImg7, UsingImg8, UsingImg9 } from '$/assets/images';
import { useTranslations } from 'next-intl';

const { Panel } = Collapse;

const UsingInfoSection = () => {
    const t = useTranslations("Using");
  return (
    <div className={`${styles.using} container`}>
      <Collapse defaultActiveKey={['1']}>
        <Panel header={t("title_1")} key="1">
            <h2 className={styles.using__title}>{t("panel_1.title")}</h2>
        
            <ul className={styles.using__desc}>
                <li>{t("panel_1.text_1")}</li>
                <div className={styles.using__img_box}>
                    <Image src={UsingImg1} alt="img"/>
                    <Image src={UsingImg2} alt="img"/>
                </div>
                <li>{t("panel_1.text_2")}</li>
                <div className={styles.using__img_box}>
                    <Image src={UsingImg3} alt="img"/>
                    <Image src={UsingImg4} alt="img"/>
                </div>
                <li>{t("panel_1.text_3")}</li>
                <div className={styles.using__img_box}>
                    <Image src={UsingImg5} alt="img"/>
                </div>
            </ul>
        </Panel>
        <Panel header={t("title_2")} key="2">
            <p className={styles.using__text}>
                {t("panel_2.text_1")}
            </p>

            <p className={styles.using__text}>{t("panel_2.text_2")}</p>

            <p className={styles.using__text}>{t("panel_2.text_3")}</p>


            <h2 className={styles.using__title}>{t("panel_2.title_1")}</h2>
            <div className={styles.using__img_box}>
                <Image src={UsingImg6} alt="img"/>
                <Image src={UsingImg7} alt="img"/>
            </div>
            <p className={styles.using__text}>{t("panel_2.text_4")}</p>

            <h2 className={styles.using__title}>{t("panel_2.title_2")}</h2>
            <div className={styles.using__img_box}>
                <Image src={UsingImg8} alt="img"/>
            </div>
            <p className={styles.using__text}>{t("panel_2.text_5")}</p>
            <p className={styles.using__text}>{t("panel_2.text_6")}z</p>

            <h2 className={styles.using__title}>{t("panel_2.title_3")}</h2>
            <div className={styles.using__img_box}>
                <Image src={UsingImg9} alt="img"/>
            </div>
            <p className={styles.using__text}>{t("panel_2.text_7")}</p>
            <h2 className={styles.using__title}>{t("panel_2.title_4")}</h2>
            <div className={styles.using__img_box}>
                <Image src={UsingImg10} alt="img"/>
            </div>
            <p className={styles.using__text}>
                {t("panel_2.text_8")}
            </p>
        </Panel>
      </Collapse>
    </div>
  )
}

export default UsingInfoSection