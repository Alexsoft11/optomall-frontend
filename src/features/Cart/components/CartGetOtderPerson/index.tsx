import React, { useEffect, useState } from 'react';
import styles from './CartGetOtderPerson.module.scss';
import { useTranslations } from 'next-intl';
import { Form, Input } from 'antd';

interface Props {
    setPersonData: any
}

export default function CartGetOrderPerson({setPersonData}: Props) {
    const t = useTranslations('Cart')
    const [form] = Form.useForm();

    const hendleChange = () => {        
        setPersonData(form.getFieldsValue())
    };
    
    return (
        <div className={styles.main}>
            <h2>{t('person')}</h2>
            <div className={styles.form_block}>
                <Form form={form} name="horizontal_login" layout="inline">
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
                        <Input onChange={hendleChange} type='text' placeholder={t("name")} />
                    </Form.Item>
                    <Form.Item name="phone">
                        <Input onChange={hendleChange} type="phone" placeholder={t("phone")} />
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
