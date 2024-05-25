import React, { useState } from 'react'
import { Button } from '@/ui/index'
import styles from './Navbar.module.scss'
import Image from 'next/image'
import { HeadLogo } from '$/assets/images/index'
import SvgSelector from '$/assets/icons/SvgSelector'
import SearchBtn from '../SearchBtn/index'
import Link from 'next/link'
import { useRouter } from "next/router";
import LanguageSelector from '../LanguageSelector/index'
import { CustomTabs } from '@/ui/Tabs'
import TabPane from 'antd/es/tabs/TabPane'
import NavigationCard from '../NavigationCard'
import { CatalogTabsData } from '@/mockdata/CatalogTabs'
import { NavLinks } from '@/constants/navbar'

const Navbar = () => {
  const router = useRouter();
  type ModalState = 'user' | 'nav' | null;

  const [openModal, setOpenModal] = useState<ModalState>(null);
  const [activeTab, setActiveTab] = useState('1');

  const handleUserBtnClick = () => {
    setOpenModal(openModal === 'user' ? null : 'user');
  };

  const handleNavBtnClick = () => {
    setOpenModal(openModal === 'nav' ? null : 'nav');
  };

  const handleWrapBtnClick = () => {
    setOpenModal(null);
  };

  const handleTabChange = (key: any) => {
    console.log(`Selected tab`);
    setActiveTab(key);
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
                onClick={handleNavBtnClick}
              />
              <SearchBtn/>

              <Link href='/'>
                <SvgSelector id="support-svg"/>
              </Link>
            </div>

            <div className={styles.navbar__logo}>
              <Image src={HeadLogo} alt='img'/>
            </div>

            <div className={styles.navbar__items}>
              <LanguageSelector/>

              <button className={styles.navbar__shop_btn}><SvgSelector id='shop-svg'/></button>

              <button className={`${styles.navbar__user_btn} ${openModal === 'user' ? styles.open : ''}`} onClick={handleUserBtnClick}>
                <SvgSelector id='user-svg'/>
              </button>

              <div className={`${styles.navbar__user_modal} ${openModal === 'user' ? styles.open : ''}`}>
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

            <div className={`${styles.navigation} ${openModal === 'nav' ? styles.open : ''}`}>
              <div className={styles.navigation__inner}>
                <CustomTabs
                  activeKey={activeTab}
                  onChange={handleTabChange}
                  tabPosition="left"
                  className={`${styles.navigation__tab} navigation_btn`}
                >
                  {CatalogTabsData.map(tab => (
                    <TabPane
                      key={tab.key}
                      tab={tab.tab}
                      className={styles.navigation__item}
                    >
                      <NavigationCard data={tab.content}/>
                    </TabPane>
                  ))}
                </CustomTabs>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <div 
        className={`${styles.wrap} ${(openModal === 'nav' || openModal === 'user') ? styles.open : ''}`} 
        onClick={handleWrapBtnClick}
      ></div>


      {/* <div className={styles.navbar__search_mobile}>
        <div className='container'>
          <div className={styles.navbar__search_inner}>
            <SearchBtn/>
          </div>
        </div>
      </div> */}

      <div className={styles.navbar__mobile}>
        <div className={styles.navbar__mobile_inner}>
          {NavLinks.map((item, index) => (
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