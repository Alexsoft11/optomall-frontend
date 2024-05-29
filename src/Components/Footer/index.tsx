import React from 'react'
import { HeadLogo } from '$/assets/images/index'
import Image from 'next/image'
import styles from './Footer.module.scss'
import SvgSelector from '$/assets/icons/SvgSelector'
import Link from 'next/link'

const Footer = () => {
  return (
    <>
      <div className={styles.footer}>
        <div className='container'>
          <div className={styles.footer_content}>
            <Image src={HeadLogo} alt="Taobao.com" className={styles.logo}/>
            <ul className={styles.footer_links}>
              <li>
                <Link href="#">О нас</Link>
              </li>
              <li>
                <Link href="#">Часто задаваемые вопросы</Link>
              </li>
              <li>
                <Link href="#">Транспортные расходы</Link>
              </li>
              <li>
                <Link href="#">Как использовать</Link>
              </li>
            </ul>
            <div className={styles.social_icons}>
              <Link href="#">
                <SvgSelector id="facebook-svg"/>
              </Link>
              <Link href="#">
                <SvgSelector id="twitter-svg"/>
              </Link>
              <Link href="#">
                <SvgSelector id="instagram-svg"/>
              </Link>
              <Link href="#">
                <SvgSelector id="linked-svg"/>
              </Link>
              <Link href="#">
                <SvgSelector id="tiktok-svg"/>
              </Link>
              <Link href="#">
                <SvgSelector id="youtube-svg"/>
              </Link>
            </div>
            <p className={styles.copyright}>© 2023 TaoBao All rights reserved</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer