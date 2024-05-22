import React, { useState } from 'react';
import styles from './ForgotPassword.module.scss';
import { Form, Input } from 'antd';
import { Button, Modal } from '@/ui';
import { useTranslations } from 'next-intl';
import { AuthModalSvg } from '$/assets/images';
import { validateEmail } from '../../Functions';

export default function ForgotPassword() {
    const [form] = Form.useForm()
    const t = useTranslations("Auth")
    const [modalIsOpen, setModalIsOpen] = useState(true)

    function submit(data: any) {
        setModalIsOpen(true)
    }

    return (
        <div className={styles.main}>
            <h1>{t('resetPassword')}</h1>
            <p className={styles.desc}>Lorem, ipsum dolor sit amet</p>
            <div className={styles.form}>
                <Form
                    form={form}
                    className={styles.form}
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

                    <Form.Item className={styles.submitButton}>
                        <Button type="primary" htmlType="submit" label={t('save')} />
                    </Form.Item>

                </Form>
                <Modal bgColor='#CCCCCC' img={AuthModalSvg} description={t('modalMessage')} open={modalIsOpen} />
            </div>
        </div>
    )
}
