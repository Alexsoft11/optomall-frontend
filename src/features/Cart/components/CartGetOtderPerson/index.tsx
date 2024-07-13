import React, { useEffect, useState } from 'react';
import styles from './CartGetOtderPerson.module.scss';
import { useTranslations } from 'next-intl';
import { Form } from 'antd';
import { validateName, validatePhone } from '@/components/Auth/Functions';
import { Input } from '@/ui';

interface Props {
    setPersonData: any
}

export default function CartGetOrderPerson({ setPersonData }: Props) {
    const t = useTranslations('')
    const [form] = Form.useForm();

    const hendleChange = () => {
        const data = form.getFieldsValue()
        data.phone = `+998${data.phone}`
        setPersonData(data)
    };

    return (
        <div className={styles.main}>
            <h2>{t('Cart.person')}</h2>
            <div className={styles.form_block}>
                <Form form={form} name="horizontal_login" layout="inline">
                    <Input
                        name="name"
                        rules={[
                            { validator: (rule, value) => validateName(t, rule, value) }
                        ]}
                        onChange={hendleChange}
                        type='text'
                        placeholder={t("name")}
                    />
                    <Input
                        onChange={hendleChange}
                        name="phone"
                        rules={[
                            { validator: (rule, value) => validatePhone(t, rule, value) },
                        ]}
                        type="text"
                        prefix={"+998"}
                        placeholder={"-- --- -- --"}
                    />
                </Form>
            </div>
        </div>
    );
}
