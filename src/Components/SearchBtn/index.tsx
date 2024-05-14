import SvgSelector from '@/assets/icons/SvgSelector'
import { Button } from '@/ui/index'
import React from 'react'
import styles from './Search.module.scss'

const SearchBtn = () => {
  return (
    <>
        <div className={styles.search}>
            <SvgSelector id='search-svg'/>

            <input type="text" />
            
            <Button 
            className='generalbtn'
            shape='circle'
            iconId='photo-svg'
            iconPosition='left'
            />
        </div>
    </>
  )
}

export default SearchBtn