import React from 'react';
import styles from './NewPassword.module.scss';
import { Form, Input, message } from 'antd';
import { Button } from '@/ui';
import { useTranslations } from 'next-intl';
import GoogleButton from '../../GoogleButton';
import { validateConfirmCode, validateConfirmPassword, validateEmail, validatePassword } from '../../Functions';
import useQueryApiClient from '@/utils/useQueryApiClient';
import GoToBack from '@/components/GoToBack';

export default function NewPassword() {
    const [form] = Form.useForm();
    const t = useTranslations("Auth");
    
    const { appendData: createData } = useQueryApiClient({
        request: {
            url: 'password/reset',
            method: 'POST',
            disableOnMount: true,
        },
        onSuccess(res) {
            message.success(res.message)
        },
        onError(err) {
            message.error(err.error)
        }  
    })

    const onFinish = (values: any) => {
        createData(values)
    }

    return (
        <div className={styles.main}>
            <GoToBack backUrl='/auth?step=forgot-password' />
            <h1>{t('reset')}</h1>
            <p className={styles.desc}>Lorem, ipsum dolor sit amet</p>
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
                    <Form.Item
                        name="otp"
                        rules={[
                            { validator: (rule, value) => validateConfirmCode(t, form, value) }
                        ]}
                    >
                        <Input type="number" placeholder={t("confirmCode")}/>
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

                    <Form.Item
                        name="confirm_password"
                        hasFeedback
                        rules={[
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
