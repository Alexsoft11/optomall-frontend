import GoToBack from '@/components/GoToBack'
import CatalogProduct from '@/features/Catalog/components/CatalogProduct'
import React from 'react'

const CatalogProductPage = () => {
  return (
    <>
        <div className='container'>
            <GoToBack pathArr={[{ title: "catalog", path: "/catalog" }]} />
        </div>
        <CatalogProduct/>
    </>
  )
}

export default CatalogProductPage