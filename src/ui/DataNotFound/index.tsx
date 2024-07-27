import { Empty } from 'antd'
import { useTranslations } from 'next-intl'
import React from 'react'

const DataNotFound = () => {
    const t = useTranslations("Error")
  return (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={t("datanot")}/>
  )
}

export default DataNotFound