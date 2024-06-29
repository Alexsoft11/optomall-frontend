/** @format */
import SvgSelector from "$/assets/icons/SvgSelector";
import Link from "next/link";
import styles from "./Profile.module.scss"
import React from "react";
import { useTranslations } from "next-intl";

const Profile = () => {
  const t = useTranslations("Navbar")
  return (
    <div className={styles.navbar__user_inner}>
      <Link href='/account' className={styles.navbar__user_item}>
        <SvgSelector id='user-modal-svg' />
        <p>{t("account")}</p>
      </Link>

      <Link href='/' className={styles.navbar__user_item}>
        <SvgSelector id='message-modal-svg' />
        <p>{t("messages")}</p>
      </Link>

      <Link href='/' className={styles.navbar__user_item}>
        <SvgSelector id='shop-modal-svg' />
        <p>{t("purchases")}</p>
      </Link>

      <Link href='/' className={styles.navbar__user_item}>
        <SvgSelector id='search-modal-svg' />
        <p>{t("customs")}</p>
      </Link>

      <Link href='/' className={styles.navbar__user_item}>
        <SvgSelector id='exit-modal-svg' />
        <p className={styles.loggout}>{t("logout")}</p>
      </Link>
    </div>
  );
};

export default Profile;
