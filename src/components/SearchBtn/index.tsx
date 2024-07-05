import React, { useEffect, useState } from 'react';
import styles from './Search.module.scss'
import { useRouter } from 'next/router'
import { Button, Input } from '@/ui';
import SvgSelector from '$/assets/icons/SvgSelector';
import { Form } from 'antd';

const SearchBtn = () => {
  const router = useRouter();
  const { query } = router.query;
  const [form] = Form.useForm()

  const handleSearch = (values:any) => {
    if (values.search) {
      router.push(`/search?query=${values.search}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      form.submit()
    }
  };

  useEffect(() => {
    if (query) {
     form.setFieldValue('search',query)
    } else {
      form.resetFields()
    }
  }, [query]);
  
  return (
    <>
        <div className={styles.search}>
            <SvgSelector id='search-svg'/>

            <Form onFinish={handleSearch} form={form}>
              <Input
                type="text"
                onKeyDown={handleKeyPress}
                className="search_input"
                name={'search'}
              />
            </Form>
            
            {/* <Button
              className='generalbtn'
              shape='circle'
              iconId='photo-svg'
              iconPosition='left'
            /> */}
        </div>
    </>
  )
}

export default SearchBtn