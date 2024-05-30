import React from 'react';
import styles from './SignIn.module.scss';
import { Form, Input } from 'antd';
import { Button } from '@/ui';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import GoogleButton from '../../GoogleButton';
import { validateEmail, validatePassword } from '../../Functions';

export default function SignIn() {
    const [form] = Form.useForm();
    const t = useTranslations("Auth");

    function submit(data: any) {
        console.log(data);
    }

    return (
        <div className={styles.main}>
            <h1>{t('signin')}</h1>
            <p className={styles.desc}>Lorem, ipsum dolor sit amet</p>
            <div className={styles.form}>
                <Form
                    form={form}
                    onFinish={(e) => submit(e)}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { validator: (rule, value) => validateEmail(t, rule, value) }
                        ]}
                    >
                        <Input type="email" placeholder={t("email")} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            { validator: (rule, value) => validatePassword(t, rule, value) }
                        ]}
                        hasFeedback
                    >
                        <Input.Password type="password" placeholder={t("yourPassword")} />
                    </Form.Item>

                    <span className={styles.forgot_Password}>
                        <Link href="/auth?step=forgot-password">
                            {t("forgotPassword")}
                        </Link>
                    </span>

                    <Form.Item className={styles.submitButton}>
                        <Button type="primary" htmlType="submit" label={t('signin')} />
                    </Form.Item>
                </Form>

                <div className={styles.not_registred}>
                    <p>{t("notRegistred")}</p>
                    <span>
                        <Link href="/auth?step=regist">{t("registerNow")}</Link>
                    </span>
                </div>

                <GoogleButton />
            </div>
        </div>
    );
}
