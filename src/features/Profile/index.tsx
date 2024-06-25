/** @format */
import SvgSelector from "$/assets/icons/SvgSelector";
import Link from "next/link";
import styles from "./Profile.module.scss"
import React from "react";

const Profile = () => {
  return (
    <div className={styles.navbar__user_inner}>
      <Link href='/account' className={styles.navbar__user_item}>
        <SvgSelector id='user-modal-svg' />
        <p>Мой аккаунт</p>
      </Link>

      <Link href='/' className={styles.navbar__user_item}>
        <SvgSelector id='message-modal-svg' />
        <p>Мои сообщения</p>
      </Link>

      <Link href='/' className={styles.navbar__user_item}>
        <SvgSelector id='shop-modal-svg' />
        <p>Мои покупки</p>
      </Link>

      <Link href='/' className={styles.navbar__user_item}>
        <SvgSelector id='search-modal-svg' />
        <p>Как считается растаможка</p>
      </Link>

      <Link href='/' className={styles.navbar__user_item}>
        <SvgSelector id='exit-modal-svg' />
        <p className={styles.loggout}>Выйти</p>
      </Link>
    </div>
  );
};

export default Profile;
