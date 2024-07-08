import React, { useState } from 'react';
import styles from './NewPassword.module.scss';
import { Form, message } from 'antd';
import { Button, Input } from '@/ui';
import { useTranslations } from 'next-intl';
import GoogleButton from '../../GoogleButton';
import { validateConfirmCode, validateConfirmPassword, validateEmail, validatePassword } from '../../Functions';
import useQueryApiClient from '@/utils/useQueryApiClient';
import GoToBack from '@/components/GoToBack';

export default function NewPassword() {
    const [form] = Form.useForm();
    const t = useTranslations("");
    const [isLoading, setIsLoading] = useState(false)

    const { appendData: createData } = useQueryApiClient({
        request: {
            url: 'password/reset',
            method: 'POST',
            disableOnMount: true,
        },
        onSuccess(res) {
            message.success(t(`Error.${res.message}`));
            setIsLoading(false)
        },
         onError() {
            setIsLoading(false)
         }
    })

    const onFinish = (values: any) => {
        console.log(values);
        
        setIsLoading(true)
        createData(values)
    }

    return (
        <div className={styles.main}>
            <GoToBack backUrl='/auth?step=forgot-password' />
            <h1>{t('Auth.reset')}</h1>
            <p className={styles.desc}>{t('Auth.newPasswordDescription')}</p>
            <div className={styles.form}>
                <Form
                    form={form}
                    onFinish={(data) => onFinish(data)}
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


                    <Input
                        name="otp"
                        rules={[
                            { validator: (rule, value) => validateConfirmCode(t, form, value) }
                        ]}
                        type="number"
                        placeholder={t("Auth.confirmCode")}
                    />

                    <Input
                        name="password"
                        rules={[
                            { validator: (rule, value) => validatePassword(t, rule, value) }
                        ]}
                        type="password"
                        placeholder={t("Auth.yourPassword")}
                    />



                    <Input
                        name="confirm_password"
                        rules={[
                            { validator: (rule, value) => validateConfirmPassword(t, form).validator(rule, value) }
                        ]}
                        type="password"
                        placeholder={t("Auth.repeatYourPassword")}
                    />


                    <Form.Item className={styles.submitButton}>
                        <Button type="primary" htmlType="submit" isLoading={isLoading} className='generalbtn' label={t('Auth.signin')} />
                    </Form.Item>

                </Form>

                <GoogleButton />
            </div>
        </div>
    );
}
