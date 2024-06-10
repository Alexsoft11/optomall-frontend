import React from 'react';
import styles from './Info.module.scss';
import { Form, Input, message } from 'antd';
import { Button } from '@/ui';
import { useTranslations } from 'next-intl';
import useQueryApiClient from '@/utils/useQueryApiClient';
import Cookies from 'universal-cookie';

export default function Info() {
    const [form] = Form.useForm();
    const t = useTranslations("Auth");
    const cookies = new Cookies();

    const { appendData: createData } = useQueryApiClient({
        request: {
            url: 'profile/update',
            method: 'POST',
            disableOnMount: true,
        },
        onSuccess(res) {
            message.success('succsess register!')
        },
        onError(err) {
            message.error('register failed :(')
        } 
    })

    const onFinish = (values: any) => {
        createData(values)
    }

    return (
        <div className={styles.main}>
            <h1>{t('info')}</h1>
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
                        name="name"
                        rules={[
                            { required: true, message: t('requiredNameMessage') },
                        ]}
                    >
                        <Input type="text" className={styles.input} placeholder={t("name")} />
                    </Form.Item>

                    <Form.Item
                        name="last_name"
                        rules={[
                            { required: true, message: t('requiredSecondNameMessage') },
                        ]}
                    >
                        <Input type="text" placeholder={t("secondName")} />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        rules={[
                            { required: true, message: t('requiredTelMessage') },
                        ]}
                    >
                        <Input type="tel" placeholder={t("tel")} />
                    </Form.Item>

                    <Form.Item className={styles.submitButton}>
                        <Button type="primary" htmlType="submit" className='generalbtn' label={t('save')} />
                    </Form.Item>

                </Form>
            </div>
        </div>
    )
}
