import React, { useState } from 'react';
import styles from './ForgotPassword.module.css';
import { Form, Input } from 'antd';
import { Button, Modal } from '@/ui';
import { useTranslations } from 'next-intl';
import { AuthModalSvg } from '@/assets/icons';

export default function ForgotPassword() {
    const [form] = Form.useForm()
    const t = useTranslations("Auth")
    const [modalIsOpen, setModalIsOpen] = useState(false)

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

                    <Form.Item className={styles.submitButton}>
                        <Button type="primary" htmlType="submit" className='generalbtn' label={t('save')} />
                    </Form.Item>

                </Form>
                <Modal img={AuthModalSvg} open={modalIsOpen} className='custom-modal' />
            </div>
        </div>
    )
}
