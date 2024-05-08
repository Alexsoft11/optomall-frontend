import React from 'react';
import styles from './Registration.module.css';
import { Form, Input } from 'antd';
import Link from 'next/link';
import { Button } from '@/ui';
import { useTranslations } from 'next-intl';
import GoogleButton from '../../GoogleButton';

export default function Registration() {
    const [form] = Form.useForm()
    const t = useTranslations("Auth")

    function submit(data: any) {
        console.log(data);
    }

    return (
        <div className={styles.main}>
            <h1>{t('regist')}</h1>
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

                    <Form.Item name="email">
                        <Input type="email" className={styles.input} placeholder={t("email")} />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password type="password" placeholder={t("yourPassword")} />
                    </Form.Item>

                    <Form.Item name="repeatPassword" rules={[{ required: true, message: 'Repeat your password!' }]}>
                        <Input.Password type="password" placeholder={t("repeatYourPassword")} />
                    </Form.Item>

                    <Form.Item className={styles.submitButton}>
                        <Button type="primary" htmlType="submit" className='generalbtn' label={t('signin')} />
                    </Form.Item>

                </Form>

                <GoogleButton />
            </div>
        </div>
    );
}
