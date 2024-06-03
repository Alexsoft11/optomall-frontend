import React from 'react';
import styles from './ForgotPassword.module.scss';
import { Form, Input } from 'antd';
import { Button } from '@/ui';
import { useTranslations } from 'next-intl';
import { validateEmail } from '../../Functions';

interface Props {
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ForgotPassword({ setModalIsOpen }: Props) {
    const [form] = Form.useForm();
    const t = useTranslations("Auth");

    function submit(data: any) {
        setModalIsOpen(true);
    }

    return (
        <div>
            <div className={styles.main}>
                <h1>{t('resetPassword')}</h1>
                <p className={styles.desc}>Lorem, ipsum dolor sit amet</p>
                <div className={styles.form}>
                    <Form
                        form={form}
                        className={styles.form}
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
                                { required: true, message: t('requiredEmailMessage') },
                                { validator: (rule, value) => validateEmail(t, rule, value) }
                            ]}
                        >
                            <Input type="email" className={styles.input} placeholder={t("email")} />
                        </Form.Item>

                        <Form.Item className={styles.submitButton}>
                            <Button type="primary" htmlType="submit" label={t('save')} />
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}
