import React, { ReactEventHandler, useState } from 'react';
import styles from './Info.module.scss';
import { Form, Input, message } from 'antd';
import { Button } from '@/ui';
import { useTranslations } from 'next-intl';
import useQueryApiClient from '@/utils/useQueryApiClient';
import { validatePhone } from '../../Functions';
import GoToBack from '@/components/GoToBack';
import { useRouter } from 'next/router';

export default function Info() {
    const [form] = Form.useForm();
    const t = useTranslations("Auth");
    const router = useRouter()

    const { appendData: createData } = useQueryApiClient({
        request: {
            url: 'personal-data',
            method: 'POST',
            disableOnMount: true,
        },
        onSuccess(res) {
            message.success(res.message)
            router.push('/auth')
        }
    })

    const onFinish = (values: any) => {
        values.unique_id = router.query.id
        createData(values)
    }

    return (
        <div className={styles.main}>
            <GoToBack backUrl='/auth?step=regist' />
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
                            { validator: (rule, value) => validatePhone(t, rule, value) }
                        ]}
                    >
                        <Input type='text' prefix={'+998'} placeholder={'-- --- -- --'} />
                    </Form.Item>

                    <Form.Item className={styles.submitButton}>
                        <Button type="primary" htmlType="submit" className='generalbtn' label={t('save')} />
                    </Form.Item>

                </Form>
            </div>
        </div>
    )
}
