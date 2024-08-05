import React, { FC } from 'react'
interface IProps {
    description:string
}
import styles from "./ProductDescription.module.scss"
const ProductDescription:FC<IProps> = ({description}) => {
  return (
    <div className={styles.html_img} dangerouslySetInnerHTML={{
        __html:description
      }}/>
  )
}

export default ProductDescription