import React, { useEffect, useState } from 'react'
import styles from './AditionalProductList.module.scss'
import Card from '@/components/Card'
import { useTranslations } from 'next-intl'
import useQueryApiClient from '@/utils/useQueryApiClient'
import { getProductLimit } from '@/utils/getProductLimit'
import { useRouter } from 'next/router'
import { LoadingSpinner } from '@/ui/Spin'

interface Props {
  category: any
}

const AditionalProductList = ({ category = {} }: Props) => {
  const t = useTranslations("");
  const { locale } = useRouter();
  const [products, setProducts] = useState(category.products || [])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const { appendData: getMoreProducts, isLoading, isError } =
    useQueryApiClient({
      request: {
        url: `additional-products`,
        method: "GET",
        disableOnMount: true,
      },
      onSuccess(res) {
        console.log(res)
        if (res.products.length == 0) {
          setHasMore(false)
          return
        }
        setProducts([...products, ...res.products])
      },
    });

  useEffect(() => {
    if (category.products.lenght) {
      setProducts(category.products)
    }
  }, [category.products])

  const handleGetMoreProducts = () => {
    const limit = getProductLimit(3)

    getMoreProducts({
      category_id: category.id,
      limit,
      page: page + 1,
      lang: locale
    })
    setPage(page + 1)
  }

  return (
    <div className={styles.product_list}>
      <div className={styles.products__cards}>
        {products?.map((el: any, idx: number) => (
          <Card
            isBlank={false}
            key={idx}
            data={el}
          />
        ))}
      </div>
      {isLoading ? <LoadingSpinner size="large" /> : !hasMore ? <></> : (
        <div data-aos="fade-up" data-aos-duration="1200" className={styles.load_more_button} onClick={handleGetMoreProducts}>
          {t('Products.load_more')}
        </div>
      )}
    </div>
  )
}

export default AditionalProductList