import React, { Fragment, useState } from 'react';
import styles from './LocationModal.module.scss';
import { Form } from 'antd';
import { useTranslations } from 'next-intl';
import { Button, Input, Modal, Select, } from '@/ui';
import SvgSelector from '$/assets/icons/SvgSelector';
import { LocationInfoInterface } from '@/components/Types';

interface Props {
    orderModalOpen: boolean,
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    setMapIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    locationInfo: LocationInfoInterface | null
}

export default function LocationModal({ orderModalOpen, setModalIsOpen, setMapIsOpen, locationInfo }: Props) {
    const [form] = Form.useForm();
    const t = useTranslations("LocationModal");
    const [buttonIsLoading, setButtonIsLoading] = useState(false)
    const onFinish = (values: any) => {
        console.log(values);
        setModalIsOpen(false)
    };
    const regions = [
        {
            id: 0,
            name: "Tashkent",
            value: "tashkent",
        },
        {
            id: 1,
            name: "Andijan",
            value: "andijan",
        },
        {
            id: 2,
            name: "Bukhara",
            value: "bukhara",
        },
        {
            id: 3,
            name: "Fergana",
            value: "fergana",
        },
        {
            id: 4,
            name: "Jizzakh",
            value: "jizzakh",
        },
        {
            id: 5,
            name: "Karakalpakstan",
            value: "karakalpakstan",
        },
        {
            id: 6,
            name: "Kashkadarya",
            value: "kashkadarya",
        },
        {
            id: 7,
            name: "Khorezm",
            value: "khorezm",
        },
        {
            id: 8,
            name: "Namangan",
            value: "namangan",
        },
        {
            id: 9,
            name: "Navoi",
            value: "navoi",
        },
        {
            id: 10,
            name: "Samarkand",
            value: "samarkand",
        },
        {
            id: 11,
            name: "Surkhandarya",
            value: "surkhandarya",
        },
        {
            id: 12,
            name: "Syrdarya",
            value: "syrdarya",
        },
    ];

    const selectProps = {
        placeholder: t('region'),
        initialValue: "Tashkent",
        children: (regions.map(el => (
            <Fragment key={el.id}>
                <div>{el.name}</div>
            </Fragment>
        ))),
    }

    if (locationInfo) {
        (Object.keys(locationInfo) as (keyof LocationInfoInterface)[]).forEach((key) => {
            const value = locationInfo[key] || '';
            form.setFieldValue(key, value);
        });
    }



    const modalProps = {
        children: (
            <div className='cart_order_modal__form'>
                <div className='form__cooseLocation' onClick={() => setMapIsOpen(true)}>
                    <p>{t('cooseLocation')}</p>
                    <SvgSelector id={"chevron-svg"} />
                </div>
                <Form
                    form={form}
                    onFinish={(data) => onFinish(data)}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                >
                    <Select name='rerion' {...selectProps} className='cart_order_modal__select' />
                    <Input
                        name="area"
                        required
                        type="text"
                        placeholder={t("area")}
                    />

                    <Input
                        name="street"
                        required
                        type="text"
                        placeholder={t("street")}
                    />

                    <Input
                        name="house"
                        required
                        type="text"
                        placeholder={t("house")}
                    />

                    <Input
                        name="postcode"
                        required
                        type="text"
                        placeholder={t("postcode")}
                    />

                    <Button className='cart_order_modal__submitButton' isLoading={buttonIsLoading} type="primary" htmlType="submit" label={t("submit")} />
                </Form>
            </div>
        ),
        title: t('title'),
        open: orderModalOpen,
        onCancel: () => setModalIsOpen(false),
    }
    return (
        <Modal {...modalProps} />
    );
}
