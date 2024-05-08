import React from 'react';
import styles from './Info.module.css';
import { Form, Input } from 'antd';
import { Button } from '@/ui';
import { useTranslations } from 'next-intl';

export default function Info() {

    const [form] = Form.useForm()
    const t = useTranslations("Auth")

    function submit(data: any) {
        console.log(data);
    }

    return (
        <div className={styles.main}>
            <h1>{t('info')}</h1>
            <p className={styles.desc}>Lorem, ipsum dolor sit amet</p>
            <div className={styles.form}>
                <Form
                    form={form}
                    onFinish={(e) => submit(e)}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    autoComplete="off"
                >

                    <Form.Item name="name">
                        <Input type="text" className={styles.input} placeholder={t("name")} />
                    </Form.Item>

                    <Form.Item name="secondName">
                        <Input type="text" placeholder={t("secondName")} />
                    </Form.Item>

                    <Form.Item name="tel">
                        <Input type="tel" placeholder={t("tel")} />
                    </Form.Item>

                    <Form.Item className={styles.submitButton}>
                        <Button type="primary" htmlType="submit" className='generalbtn' label={t('save')} />
                    </Form.Item>

                </Form>
            </div>
        </div>
    )
}
