import { Button } from '@/ui/index'
import React from 'react'
import styles from './Nabvar.module.scss'
import Image from 'next/image'
import { HeadLogo } from '@/assets/images/index'
import SvgSelector from '@/assets/icons/SvgSelector'
import SearchBtn from '../SearchBtn/index'

const Navbar = () => {
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
            </div>

            <div className={styles.navbar__logo}>
              <Image src={HeadLogo}/>
            </div>

            <div className={styles.navbar__items}>
              <button className={styles.navbar__language_btn}><SvgSelector id='language-svg'/> RU</button>

              <button className={styles.navbar__shop_btn}><SvgSelector id='shop-svg'/></button>

              <button className={styles.navbar__user_btn}><SvgSelector id='user-svg'/></button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar