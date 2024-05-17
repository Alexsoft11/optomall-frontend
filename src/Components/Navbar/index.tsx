import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/ui/index'
import styles from './Navbar.module.scss'
import Image from 'next/image'
import { HeadLogo } from '$/assets/images/index'
import SvgSelector from '$/assets/icons/SvgSelector'
import SearchBtn from '../SearchBtn/index'
import Link from 'next/link'
import { useRouter } from "next/router";
import LanguageSelector from '../LanguageSelector/index'

const Navbar = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  
  const navLinks = [
    { key: 'home', link: '/', text: 'Главная' },
    { key: 'catalog', link: '/catalog', text: 'Каталог' },
    { key: 'shop', link: '/cart', text: 'Корзина' },
    { key: 'user', link: '/profile', text: 'Профиль' }
  ];
  const handleUserBtnClick = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <div className={styles.navbar}>
        <div className='container'>
          <div className={styles.navbar__inner}>
            <div className={styles.navbar__block}>
              <Button 
                className='headbtn'
                iconId='catalog-svg' 
                iconPosition='top' 
                label='Каталог'
                size='middle'
              />
              <SearchBtn/>

              <Link href='/'>
                <SvgSelector id="support-svg"/>
              </Link>
            </div>

            <div className={styles.navbar__logo}>
              <Image src={HeadLogo}/>
            </div>

            <div className={styles.navbar__items}>
              <LanguageSelector/>

              <button className={styles.navbar__shop_btn}><SvgSelector id='shop-svg'/></button>

              <button className={`${styles.navbar__user_btn} ${modalOpen ? styles.open : ''}`} onClick={handleUserBtnClick}>
                <SvgSelector id='user-svg'/>
              </button>

              <div className={`${styles.navbar__user_modal} ${modalOpen ? styles.open : ''}`}>
                <div className={styles.navbar__user_inner}>
                  <Link href='/' className={styles.navbar__user_item}>
                    <SvgSelector id="user-modal-svg"/>
                    <p>Мой аккаунт</p>
                  </Link>

                  <Link href='/' className={styles.navbar__user_item}>
                    <SvgSelector id="message-modal-svg"/>
                    <p>Мои сообщения</p>
                  </Link>

                  <Link href='/' className={styles.navbar__user_item}>
                    <SvgSelector id="shop-modal-svg"/>
                    <p>Мои покупки</p>
                  </Link>

                  <Link href='/' className={styles.navbar__user_item}>
                    <SvgSelector id="search-modal-svg"/>
                    <p>Как считается растаможка</p>
                  </Link>

                  <Link href='/' className={styles.navbar__user_item}>
                    <SvgSelector id="exit-modal-svg"/>
                    <p>Выйти</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className={styles.navbar__search_mobile}>
        <div className='container'>
          <div className={styles.navbar__search_inner}>
            <SearchBtn/>
          </div>
        </div>
      </div> */}

      <div className={styles.navbar__mobile}>
        <div className={styles.navbar__mobile_inner}>
        {navLinks.map((item, index) => (
          <Link
            className={`${styles.navbar__mobile_item} ${router.pathname === item.link ? styles.activeItem : ''}`}
            key={index}
            href={item.link}
          >
            <SvgSelector id={`${item.key}-svg`} />
            <p>{item.text}</p>
          </Link>
        ))}
        </div>
      </div>
    </>
  )
}

export default Navbar