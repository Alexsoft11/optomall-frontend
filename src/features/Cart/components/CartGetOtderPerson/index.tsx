import React, { useEffect, useState } from 'react';
import styles from './CartGetOtderPerson.module.scss';
import { useTranslations } from 'next-intl';
import { Form, Input } from 'antd';

export default function CartGetOrderPerson() {
    const t = useTranslations('Cart')
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Finish:', values);
    };
    return (
        <div className={styles.main}>
            <h2>{t('person')}</h2>
            <div className={styles.form_block}>
                <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
                    <Form.Item name="name"
                        rules={
                            [
                                {
                                    required: true,
                                    message: t('enterYourName'),
                                },
                                {
                                    pattern: /^[A-Za-z\s]+$/,
                                    message: t("nameValidation"),
                                },
                            ]
                        }>
                        <Input type='text' placeholder={t("name")} />
                    </Form.Item>
                    <Form.Item name="phone">
                        <Input type="phone" placeholder={t("phone")} />
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
