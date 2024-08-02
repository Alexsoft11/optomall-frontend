import React, { useState } from 'react'
import styles from './Search.module.scss'
import SvgSelector from '$/assets/icons/SvgSelector'
import Card from '@/components/Card'
import SearchBtn from '@/components/SearchBtn'
import { useTranslations } from 'next-intl'
import Products from '@/components/Products'
import { Button, Input } from '@/ui'
import { Form } from 'antd'
import { useRouter } from 'next/router'

interface Props {
  data: any;
}

const Search = ({ data }: Props) => {
  const t = useTranslations("Search")
  const [activePlatform, setActivePlatform] = useState('taobao');
  const [form] = Form.useForm();
  const router = useRouter();

  const handleButtonClick = (platform: any) => {
    setActivePlatform(platform);
  };
  console.log(router)

  const handleFilter = (values: any) => {
    let { min_price, max_price } = values;
    
    if (min_price > max_price) {
      [min_price, max_price] = [max_price, min_price];
      form.setFieldsValue({ min_price, max_price });
    }

    const queryString = new URLSearchParams({
      ...router.query,
      startPrice: min_price,
      endPrice: max_price
    }).toString();

    router.push(`/search?${queryString}`);
  };

  return (
    <>
        <div className={styles.search}>
          <div className='container'>
            <div className={styles.search__inner}>
                <div className={styles.search__media}>
                    <div className={styles.search__platform}>
                      <h2>{t('platform')}:</h2>
                      <button
                          className={`${styles.search__platform_btn} ${activePlatform === 'alibaba' ? styles.active : ''}`}
                          onClick={() => handleButtonClick('alibaba')}
                      >
                          <SvgSelector id="1688-svg"/>
                          <span>1688</span>
                      </button>

                      <button
                        className={`${styles.search__platform_btn} ${
                          activePlatform === "taobao" ? styles.active : ""
                        }`}
                        onClick={() => handleButtonClick("taobao")}
                      >
                        <SvgSelector id="taobao-svg" />
                        <span>TaoBao</span>
                      </button>
                    </div>

                    <div className={styles.search__btn}>
                      <SearchBtn />
                    </div>

                    <div className={styles.search__top}>
                        <div className={styles.search__inputs}>
                          <Form onFinish={handleFilter} form={form}>
                            <Input
                              type="number"
                              className={styles.search__input}
                              name={"min_price"}
                              placeholder='min price'
                              rules={[{ required: true, message: t('min_price') }]}
                              suffix={<SvgSelector id="sorting-svg" />}
                            />
                            <Input
                              type="number"
                              className={styles.search__input}
                              name={"max_price"}
                              placeholder='max price'
                              rules={[{ required: true, message: t('max_price') }]}
                              suffix={<SvgSelector id="sorting-svg" />}
                            />
                            <Button
                              type="primary"
                              htmlType="submit"
                              className="generalbtn"
                              label={t("submit")}
                            />
                          </Form>
                        </div>
                    </div>
                </div>
                <Products data={data}/>
            </div>
          </div>
        </div>
    </>
  );
};

export default Search;
