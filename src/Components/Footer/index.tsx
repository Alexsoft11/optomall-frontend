import React from 'react'
import { HeadLogo } from '$/assets/images/index'
import Image from 'next/image'
import styles from './Footer.module.scss'
import SvgSelector from '$/assets/icons/SvgSelector'

const Footer = () => {
  return (
    <>
      <div className={styles.footer}>
        <div className='container'>
          <div className={styles.footer_content}>
            <Image src={HeadLogo} alt="Taobao.com" className={styles.logo}/>
            <ul className={styles.footer_links}>
              <li>
                <a href="#">О нас</a>
              </li>
              <li>
                <a href="#">Часто задаваемые вопросы</a>
              </li>
              <li>
                <a href="#">Транспортные расходы</a>
              </li>
              <li>
                <a href="#">Как использовать</a>
              </li>
            </ul>
            <div className={styles.social_icons}>
              <a href="#">
                <SvgSelector id="facebook-svg"/>
              </a>
              <a href="#">
                <SvgSelector id="twitter-svg"/>
              </a>
              <a href="#">
                <SvgSelector id="instagram-svg"/>
              </a>
              <a href="#">
                <SvgSelector id="linked-svg"/>
              </a>
              <a href="#">
                <SvgSelector id="tiktok-svg"/>
              </a>
              <a href="#">
                <SvgSelector id="youtube-svg"/>
              </a>
            </div>
            <p className={styles.copyright}>© 2023 TaoBao All rights reserved</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer