import React from "react";
import styles from "./MakePayment.module.scss";
import { useTranslations } from "next-intl";
import {
  MakePayment1,
  MakePayment2,
  MakePayment3,
  MakePayment4,
  MakePayment5,
  MakePayment6,
  MakePayment7,
  MakePayment8,
} from "$/assets/images";
import Image from "next/image";

const MakePayment = () => {
  const t = useTranslations("MakePayment");
  return (
    <div className={`${styles.using} container`}>
      <div>
        <div>
          <h2
            className={styles.using__title}
            data-aos="fade-up"
            data-aos-duration="1200">
            {t("text")}
          </h2>

          <div className={styles.using__desc}>
            <p data-aos="fade-up" data-aos-duration="1300">
              {t("text_1")}
            </p>
            <p data-aos="fade-up" data-aos-duration="1400">
              {t("text_2")}
            </p>
            <div
              className={styles.using__img_box}
              data-aos="fade-up"
              data-aos-duration="1500">
              <Image src={MakePayment1} alt="img" />
            </div>
            <p data-aos="fade-up" data-aos-duration="1600">{t("text_3")}</p>
            <div className={styles.using__img_box} data-aos="fade-up">
              <Image src={MakePayment8} alt="img" />
            </div>
            <p data-aos="fade-up">{t("text_4")}</p>
            <div className={styles.using__img_box} data-aos="fade-up">
              <Image src={MakePayment2} alt="img" />
            </div>
            <p data-aos="fade-up">{t("text_5")}</p>
            <div className={styles.using__img_box} data-aos="fade-up">
              <Image src={MakePayment3} alt="img" />
            </div>
            <p data-aos="fade-up" >{t("text_6")}</p>
            <div className={styles.using__img_box} data-aos="fade-up">
              <Image src={MakePayment4} alt="img" />
            </div>
            <p data-aos="fade-up">{t("text_7")}</p>
            <div className={styles.using__img_box} data-aos="fade-up">
              <Image src={MakePayment5} alt="img" />
            </div>
            <p data-aos="fade-up">{t("text_8")}</p>
            <div className={styles.using__img_box} data-aos="fade-up">
              <Image src={MakePayment6} alt="img" />
            </div>
            <p data-aos="fade-up">{t("text_9")}</p>
            <div className={styles.using__img_box} data-aos="fade-up">
              <Image src={MakePayment7} alt="img" />
            </div>
            <p data-aos="fade-up">{t("text_10")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakePayment;
