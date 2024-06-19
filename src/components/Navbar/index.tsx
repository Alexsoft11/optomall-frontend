import React, { useEffect, useState } from 'react';
import { Button } from '@/ui/index';
import { HeadLogo } from '$/assets/images/index';
import { NavLinks } from '@/constants/navbar';
import styles from './Navbar.module.scss';
import Image from 'next/image';
import SvgSelector from '$/assets/icons/SvgSelector';
import SearchBtn from '../SearchBtn/index';
import Link from 'next/link';
import LanguageSelector from '../LanguageSelector/index';
import { useRouter } from 'next/router';
import CatalogTab from '../CatalogTab';
import { useTranslations } from 'next-intl';
import { useJwt } from '@/utils/useJwt';


const Navbar = () => {
  const token = useJwt();
  const router = useRouter();
  const t = useTranslations("Navbar")
  type ModalState = 'user' | 'nav' | null;

  const [openModal, setOpenModal] = useState<ModalState>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleUserBtnClick = () => {
    setOpenModal(openModal === 'user' ? null : 'user');
  };

  const handleNavBtnClick = () => {
    setOpenModal(openModal === 'nav' ? null : 'nav');
  };

  const handleWrapBtnClick = () => {
    setOpenModal(null);
  };

  return (
    <>
      <div className={styles.navbar}>
        <div className="container">
          <div className={styles.navbar__inner}>
            <div className={styles.navbar__block}>
              <Button 
                className='headbtn'
                iconId='catalog-svg' 
                iconPosition='top' 
                label='Каталог'
                size='middle'
                onClick={handleNavBtnClick}
              />
              <SearchBtn />

              <Link href="/">
                <SvgSelector id="support-svg" />
              </Link>
            </div>

            <div className={styles.navbar__logo}>
              <Image src={HeadLogo} alt='img'/>
            </div>

            <div className={styles.navbar__items}>
              <LanguageSelector />

              {isMounted && token && (
                  <>
                    <button className={styles.navbar__shop_btn}>
                      <Link  href='/cart'><SvgSelector id='shop-svg'/></Link>
                    </button>

                    <button className={`${styles.navbar__user_btn} ${openModal === 'user' ? styles.open : ''}`} onClick={handleUserBtnClick}>
                      <SvgSelector id='user-svg'/>
                    </button>

                    <div className={`${styles.navbar__user_modal} ${openModal === 'user' ? styles.open : ''}`}>
                      <div className={styles.navbar__user_inner}>
                        <Link href="/" className={styles.navbar__user_item}>
                          <SvgSelector id="user-modal-svg" />
                          <p>{t("account")}</p>
                        </Link>

                        <Link href="/" className={styles.navbar__user_item}>
                          <SvgSelector id="message-modal-svg" />
                          <p>{t("messages")}</p>
                        </Link>

                        <Link href="/" className={styles.navbar__user_item}>
                          <SvgSelector id="shop-modal-svg" />
                          <p>{t("purchases")}</p>
                        </Link>

                        <Link href="/" className={styles.navbar__user_item}>
                          <SvgSelector id="search-modal-svg" />
                          <p>{t("customs")}</p>
                        </Link>

                        <Link href="/" className={styles.navbar__user_item}>
                          <SvgSelector id="exit-modal-svg" />
                          <p>{t("logout")}</p>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
            </div>

            <CatalogTab setOpenModal={setOpenModal} openModal={openModal}/>

          </div>
        </div>
      </div>
      
      <div 
        className={`${styles.wrap} ${(openModal === 'nav' || openModal === 'user') ? styles.open : ''}`} 
        onClick={handleWrapBtnClick}
      ></div>

      <div className={styles.navbar__mobile}>
        <div className={styles.navbar__mobile_inner}>
          {NavLinks.map((item, idx) => (
            <Link
              className={`${styles.navbar__mobile_item} ${router.pathname === item.link ? styles.activeItem : ''}`}
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
