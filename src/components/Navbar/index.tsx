import React, { useEffect, useState } from "react";
import { Button, Modal } from "@/ui/index";
import { AuthModalSvg, HeadLogo, HeadLogoMini, HeadPhone } from "$/assets/images/index";
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
import useQueryApiClient from "@/utils/useQueryApiClient";
import useSearchStore from "../useSearchStore";

const Navbar = () => {
  const token = useJwt();
  const router = useRouter();
  const t = useTranslations("Navbar");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  type ModalState = "user" | "nav" | null;
  const [isCheckShow, setIsCheckShow] = useState();
  const { setScrollPosition } = useSearchStore();

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

  const handleModalIsOpen = () => {
    setModalIsOpen(true);
  };

  const { appendData: isCheckApiCarts } = useQueryApiClient({
    request: {
      url: "has-items",
      method: "GET",
      disableOnMount: true,
    },
    onSuccess(res) {
      setIsCheckShow(res)
    },
  });

  useEffect(() => {
    isCheckApiCarts();
  }, []);

  const { appendData: getCategoryData, data: categoryData } = useQueryApiClient(
    {
      request: {
        url: `categories-from-taobao?lang=${router.locale}`,
        method: "GET",
      },
    }
  );


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
                  label={t("catalog")}
                  size="middle"
                  onClick={handleNavBtnClick}
                />
                <SearchBtn categoryData={categoryData.categories} />

                <button
                  className={styles.navbar__support}
                  onClick={handleModalIsOpen}
                >
                  <SvgSelector id="support-svg" />
                </button>
                <Modal
                  onCancel={setModalIsOpen}
                  className="bg_white"
                  img={HeadPhone}
                  description={
                    <>
                      {t("modalMessage")}<br />
                      <a href="tel:+998988889885">+998 98 888 98 85</a>
                    </>
                  }
                  open={modalIsOpen}
                />
              </div>

              <Link href="/" className={styles.navbar__logo} onClick={() => setScrollPosition(0)}>
                <Image src={HeadLogoMini} alt="img" />
              </Link>

              <div className={styles.navbar__items}>
                <LanguageSelector />

                <button className={styles.navbar__saved_btn}>
                  <Link href="/wishes">
                    <SvgSelector id="saved-svg" />
                  </Link>
                </button>

                {isMounted && token ? (
                  <>
                    <button className={styles.navbar__shop_btn}>
                      <Link href="/cart">
                        <SvgSelector id="shop-svg" />
                      </Link>
                      {
                        isCheckShow && (
                          <span></span>
                        )
                      }
                    </button>
                    <button
                      className={`${styles.navbar__user_btn} ${openModal === "user" ? styles.open : ""
                        }`}
                      onClick={handleUserBtnClick}
                    >
                      <SvgSelector id="user-svg" />
                    </button>

                    <div
                      className={`${styles.navbar__user_modal} ${openModal === "user" ? styles.open : ""
                        }`}
                    >
                      <div className={styles.navbar__user_inner}>
                        {ModalLinks.map((link: any) => (
                          <Link
                            href={link.href}
                            onClick={() => {
                              logOut(link.textKey);
                              setOpenModal(null);
                              setScrollPosition(0)
                            }}
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
                    <div className={styles.navbar__btn_access}>
                      <Button
                        className="generalbtn"
                        label={t("btn_access")}
                        size="large"
                        href="/auth"
                      />
                    </div>

                    <div className={styles.navbar__btn_regist}>
                      <Button
                        className="line_btn"
                        label={t("btn_regist")}
                        size="large"
                        href="/auth?step=signUp"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <CatalogTab
              categoryData={categoryData.categories}
              setOpenModal={setOpenModal}
              openModal={openModal}
            />
          </div>
        </div>
      </div>

      <div
        className={`${styles.wrap} ${openModal === "nav" || openModal === "user" ? styles.open : ""
          }`}
        onClick={handleWrapBtnClick}
      ></div>

      <div className={styles.navbar__mobile}>
        <div className={styles.navbar__mobile_inner}>
          {NavLinks.map((item, idx) => (
            <Link
              className={`${styles.navbar__mobile_item} ${item.link === "/"
                ? router.pathname === item.link
                  ? styles.activeItem
                  : ""
                : router.pathname.startsWith(item.link)
                  ? styles.activeItem
                  : ""
                }`}
              key={idx}
              href={item.link}
              onClick={() => setScrollPosition(0)}
            >
              <SvgSelector id={`${item.key}-svg`} />
              <p>{t(item.key)}</p>
              {
                isCheckShow && item.key == "shop" && (
                  <span></span>
                )
              }
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
