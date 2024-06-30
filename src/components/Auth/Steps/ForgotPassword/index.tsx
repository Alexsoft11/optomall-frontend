import React from 'react';
import styles from './ForgotPassword.module.scss';
import { Form, Input, message } from 'antd';
import { Button } from '@/ui';
import { useTranslations } from 'next-intl';
import { validateEmail } from '../../Functions';
import useQueryApiClient from '@/utils/useQueryApiClient';
import GoToBack from '@/components/GoToBack';
import { useRouter } from 'next/router';

interface Props {
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function ForgotPassword({ setModalIsOpen }: Props) {
    const [form] = Form.useForm();
    const t = useTranslations("");
    const router = useRouter()

    const { appendData: createData } = useQueryApiClient({
        request: {
            url: 'password/forgot',
            method: 'POST',
            disableOnMount: true,
        },
        onSuccess(res) {
            message.success(`Error.${res.message}`)
            router.push({
                pathname: '/auth',
                query: {step: 'reset'}
            })
        }
    })

    const onFinish = (values: any) => {
        createData(values)
    }

    return (
        <div>
            <div className={styles.main}>
                <GoToBack backUrl='/auth' />
                <h1>{t('Auth.resetPassword')}</h1>
                <p className={styles.desc}>{t('Auth.forgotPasswordDescription')}</p>
                <div className={styles.form}>
                    <Form
                        form={form}
                        className={styles.form}
                        onFinish={(data) => onFinish(data)}
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: t('Auth.requiredEmailMessage') },
                                { validator: (rule, value) => validateEmail(t, rule, value) }
                            ]}
                        >
                            <Input type="email" className={styles.input} placeholder={t("email")} />
                        </Form.Item>

                        <Form.Item className={styles.submitButton}>
                            <Button type="primary" htmlType="submit" label={t('Auth.save')} />
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}
