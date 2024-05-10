import React from 'react';
import styles from './Registration.module.css';
import { Form, Input } from 'antd';
import Link from 'next/link';
import { Button } from '@/ui';
import { useTranslations } from 'next-intl';
import GoogleButton from '../../GoogleButton';
import { validateConfirmPassword, validateEmail, validatePassword } from '../../Functions';

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

                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Пожалуйста, введите адрес электронной почты' },
                            { validator: validateEmail }
                        ]}
                    >
                        <Input type="email" className={styles.input} placeholder={t("email")} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: 'введите пароль' },
                            { validator: validatePassword }
                        ]}
                        hasFeedback
                    >
                        <Input.Password type="password" placeholder={t("yourPassword")} />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        hasFeedback
                        rules={[
                            { required: true, message: 'Пожалуйста, подтвердите пароль' },
                            validateConfirmPassword,
                        ]}
                    >
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
