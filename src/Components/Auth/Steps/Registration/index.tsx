import React from 'react';
import styles from './Registration.module.scss';
import { Form, Input } from 'antd';
import { Button } from '@/ui';
import GoogleButton from '../../GoogleButton';
import { validateConfirmPassword, validateEmail, validatePassword } from '../../Functions';
import { useTranslations } from 'next-intl';

export default function Registration() {
    const [form] = Form.useForm();
    const t = useTranslations("Auth");

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
                            { required: true, message: t('requiredEmailMessage') },
                            { validator: (rule, value) => validateEmail(t, rule, value) }
                        ]}
                    >
                        <Input type="email" className={styles.input} placeholder={t("email")} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { required: true, message: t('requiredPasswordMessage') },
                            { validator: (rule, value) => validatePassword(t, rule, value) }
                        ]}
                        hasFeedback
                    >
                        <Input.Password type="password" placeholder={t("yourPassword")} />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        hasFeedback
                        rules={[
                            { required: true, message: t('requiredConfirmPasswordMessage') },
                            { validator: (rule, value) => validateConfirmPassword(t, form).validator(rule, value) }
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
