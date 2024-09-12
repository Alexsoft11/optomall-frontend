import React from 'react'
import styles from "./AboutUsSection.module.scss"
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { AboutImg } from '$/assets/images'

const AboutUsSection = () => {
    const t = useTranslations("About");
  return (
    <div className={`${styles.about} container`}>
        <div className={styles.about__image} data-aos="fade-up">
            <Image src={AboutImg} alt=""/>
        </div>
        <h2 data-aos="fade-up">{t("welcome")}</h2>
        <p data-aos="fade-up" data-aos-duration="1000">
            {t("partnership")}
        </p>
        <p data-aos="fade-up" data-aos-duration="1200">
            {t("features")}
        </p>
        <p data-aos="fade-up" data-aos-duration="1400">
            {t("reliability")} 
        </p>
        <p data-aos="fade-up" data-aos-duration="1600">
            {t("safety")}
        </p>
        <div data-aos="fade-up" data-aos-duration="1800">
            {t("or")} <Link href="tel:+998910105005">+998 91 010 50 05</Link> {t("contact")}
        </div>
    </div>
  )
}

export default AboutUsSection