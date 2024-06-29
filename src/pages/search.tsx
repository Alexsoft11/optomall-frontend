import GoToBack from '@/components/GoToBack'
import Search from '@/features/Search/components/Search'
import { CardInterface } from '@/interfaces';
import useQueryApiClient from '@/utils/useQueryApiClient';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const searchPage = () => {
  const [products, setProducts] = useState<CardInterface[]>([]);
  const router = useRouter();
  const { query } = router.query;

  const { appendData: getProductsData } = useQueryApiClient({
    request: {
      url: `search-products-from-taobao?searchQuery=${query}`,
      method: 'GET',
      disableOnMount:true,
    },
    onSuccess(res) {
      setProducts(res.products);
    }
  });

useEffect(() => {
  if (query) {
    getProductsData()
  }
  
}, [query])

  

  return (
    <>
        <div className='container'>
            <GoToBack pathArr={[{ title: "results", path: "search" }]} />
        </div>
        <Search data={products}/>
    </>
  )
}

export default searchPage