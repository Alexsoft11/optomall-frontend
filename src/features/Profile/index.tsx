/** @format */
import SvgSelector from "$/assets/icons/SvgSelector";
import Link from "next/link";
import styles from "./Profile.module.scss";
import React from "react";
import { useTranslations } from "next-intl";
import { UseLogOut } from "@/utils/useLogOut";

const Profile = () => {
  const t = useTranslations("Navbar");
  if (typeof window == "undefined") return null;

  const logOut = () => {
    UseLogOut();
  };

  return (
    <div className={styles.navbar__user_inner}>
      <Link href="/account" className={styles.navbar__user_item}>
        <SvgSelector id="user-modal-svg" />
        <p>{t("account")}</p>
      </Link>

      <Link href="/messages" className={styles.navbar__user_item}>
        <SvgSelector id="message-modal-svg" />
        <p>{t("messages")}</p>
      </Link>

      <Link href="/purchases?filter=all" className={styles.navbar__user_item}>
        <SvgSelector id="shop-modal-svg" />
        <p>{t("purchases")}</p>
      </Link>

      <Link
        href="/my-reviews?filter=commented"
        className={styles.navbar__user_item}>
        <SvgSelector id="search-modal-svg" />
        <p>{t("views")}</p>
      </Link>
      {/* <Link href="/customs" className={styles.navbar__user_item}>
        <SvgSelector id="search-modal-svg" />
        <p>{t("customs")}</p>
      </Link> */}
      <Link href="/make-payment" className={styles.navbar__user_item}>
        <SvgSelector id="search-modal-svg" />
        <p>{t("make_payment")}</p>
      </Link>
      {/* <Link href="/messages" className={styles.navbar__user_item}>
        <SvgSelector id="search-modal-svg" />
        <p>{t("questions")}</p>
      </Link> */}
      <Link href="/transport" className={styles.navbar__user_item}>
        <SvgSelector id="transport-svg" />
        <p>{t("transport")}</p>
      </Link>
      <Link href="/usinginfo" className={styles.navbar__user_item}>
        <SvgSelector id="use-svg" />
        <p>{t("use")}</p>
      </Link>
      <Link
        href="/"
        onClick={() => logOut()}
        className={styles.navbar__user_item}>
        <SvgSelector id="exit-modal-svg" />
        <p className={styles.loggout}>{t("logout")}</p>
      </Link>
    </div>
  );
};

export default Profile;
