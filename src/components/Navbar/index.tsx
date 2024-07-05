import React, { useEffect, useState } from "react";
import { Button } from "@/ui/index";
import { HeadLogo } from "$/assets/images/index";
import { ModalLinks, NavLinks } from "@/constants/navbar";
import styles from "./Navbar.module.scss";
import Image from "next/image";
import SvgSelector from "$/assets/icons/SvgSelector";
import SearchBtn from "../SearchBtn/index";
import Link from "next/link";
import LanguageSelector from "../LanguageSelector/index";
import { useRouter } from "next/router";
import CatalogTab from "../CatalogTab";
import { useTranslations } from "next-intl";
import { useJwt } from "@/utils/useJwt";
import { UseLogOut } from "@/utils/useLogOut";

const Navbar = () => {
  const token = useJwt();
  const router = useRouter();
  const t = useTranslations("Navbar");
  type ModalState = "user" | "nav" | null;

  const [openModal, setOpenModal] = useState<ModalState>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const logOut = (textKey: string) => {
    if (textKey === "logout") UseLogOut();
  };

  const handleUserBtnClick = () => {
    setOpenModal(openModal === "user" ? null : "user");
  };

  const handleNavBtnClick = () => {
    setOpenModal(openModal === "nav" ? null : "nav");
  };

  const handleWrapBtnClick = () => {
    setOpenModal(null);
  };

  return (
    <>
      <div className={styles.navbar}>
        <div className="container">
          <div className={styles.navbar__inner}>
            <div className={styles.navbar__top}>
              <div className={styles.navbar__block}>
                <Button
                  className="headbtn"
                  iconId="catalog-svg"
                  iconPosition="top"
                  label="Каталог"
                  size="middle"
                  onClick={handleNavBtnClick}
                />
                <SearchBtn />

                <Link href="/">
                  <SvgSelector id="support-svg" />
                </Link>
              </div>

              <Link href="/" className={styles.navbar__logo}>
                <Image src={HeadLogo} alt="img" />
              </Link>

              <div className={styles.navbar__items}>
                <LanguageSelector />

                {isMounted && token ? (
                  <>
                    <button className={styles.navbar__shop_btn}>
                      <Link href="/cart">
                        <SvgSelector id="shop-svg" />
                      </Link>
                    </button>

                    <button
                      className={`${styles.navbar__user_btn} ${
                        openModal === "user" ? styles.open : ""
                      }`}
                      onClick={handleUserBtnClick}
                    >
                      <SvgSelector id="user-svg" />
                    </button>

                    <div
                      className={`${styles.navbar__user_modal} ${
                        openModal === "user" ? styles.open : ""
                      }`}
                    >
                      <div className={styles.navbar__user_inner}>
                        {ModalLinks.map((link: any) => (
                          <Link
                            href={link.href}
                            onClick={() => logOut(link.textKey)}
                            className={styles.navbar__user_item}
                            key={link.id}
                          >
                            <SvgSelector id={link.id} />
                            <p>{t(link.textKey)}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Link href="/auth" className={styles.navbar__btn_access}>
                      <Button
                        className="generalbtn"
                        label={t("btn_access")}
                        size="large"
                      />
                    </Link>

                    <Link href="/auth?step=regist" className={styles.navbar__btn_regist}>
                      <Button
                        className="line_btn"
                        label={t("btn_regist")}
                        size="large"
                      />
                    </Link>
                  </>
                )}
              </div>
            </div>
            <CatalogTab setOpenModal={setOpenModal} openModal={openModal} />
          </div>
        </div>
      </div>

      <div
        className={`${styles.wrap} ${
          openModal === "nav" || openModal === "user" ? styles.open : ""
        }`}
        onClick={handleWrapBtnClick}
      ></div>

      <div className={styles.navbar__mobile}>
        <div className={styles.navbar__mobile_inner}>
          {NavLinks.map((item, idx) => (
            <Link
              className={`${styles.navbar__mobile_item} ${
                router.pathname === item.link ? styles.activeItem : ""
              }`}
              key={idx}
              href={item.link}
            >
              <SvgSelector id={`${item.key}-svg`} />
              <p>{item.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
