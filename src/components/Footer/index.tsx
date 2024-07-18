import React, { useState, useEffect } from 'react'
import { HeadLogo } from '$/assets/images/index'
import Image from 'next/image'
import styles from './Footer.module.scss'
import Link from 'next/link'
import useQueryApiClient from '@/utils/useQueryApiClient'
import { FooterInterface } from '../Types'
import { useTranslations } from 'next-intl'

const Footer = () => {
  const [footerData, setFooterData] = useState<FooterInterface[]>([])
  const t = useTranslations("Footer")

  const { appendData: getFooterData } = useQueryApiClient({
    request: {
      url: "socials",
      method: "GET",
    },
    onSuccess(res) {
      if (Array.isArray(res.socials)) {
        setFooterData(res.socials);
      } else {
        console.error('Unexpected response format:', res);
      }
    },
  });

  return (
    <>
      <div className={styles.footer}>
        <div className='container'>
          <div className={styles.footer_content}>
            <Image src={HeadLogo} alt="Taobao.com" className={styles.logo} />
            <ul className={styles.footer_links}>
              <li>
                <Link href="#">{t("about_us")}</Link>
              </li>
              <li>
                <Link href="#">{t("faq")}</Link>
              </li>
              <li>
                <Link href="#">{t("shipping_costs")}</Link>
              </li>
              <li>
                <Link href="#">{t("how_to_use")}</Link>
              </li>
            </ul>
            <div className={styles.social_icons}>
              {Array.isArray(footerData) && footerData.map((item, idx) => (
                <Link key={idx} href={item.path}>
                  <Image src={item.icon} alt="img" width={32} height={32}/>
                </Link>
              ))}
            </div>
            <p className={styles.copyright}>© 2023 TaoBao All rights reserved</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
