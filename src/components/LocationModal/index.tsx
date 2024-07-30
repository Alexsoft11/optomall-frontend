import React, { Fragment, useEffect, useState } from 'react';
import styles from './LocationModal.module.scss';
import { Form } from 'antd';
import { useTranslations } from 'next-intl';
import { Button, Input, Modal, Select, SelectOption, } from '@/ui';
import SvgSelector from '$/assets/icons/SvgSelector';
import { LocationInfoInterface } from '@/components/Types';
import { regions } from '@/constants/location';

interface Props {
    orderModalOpen: boolean,
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    setMapIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    locationInfo: LocationInfoInterface,
    setLocationInfo: React.Dispatch<React.SetStateAction<LocationInfoInterface>>
}

export default function LocationModal({ orderModalOpen, setModalIsOpen, setMapIsOpen, locationInfo, setLocationInfo }: Props) {
    const [form] = Form.useForm();
    const t = useTranslations("LocationModal");
    const [buttonIsLoading, setButtonIsLoading] = useState(false)
    const [region, setRegion] = useState(locationInfo.name)

    const onFinish = (values: any) => {
        const clone = Object.assign(locationInfo, {})
        clone.district = values.district
        clone.house = values.house
        clone.post_index = +values.post_index
        clone.region = region
        clone.street = values.street
        setLocationInfo(clone)
        setModalIsOpen(false)
    };

    useEffect(() => {
        form.setFieldValue('post_index', '')
    }, [])


    if (locationInfo) {
        (Object.keys(locationInfo) as (keyof LocationInfoInterface)[]).forEach((key) => {
            const value = locationInfo[key] || '';
            form.setFieldValue(key, value);
        });
    }



    const modalProps = {
        children: (
            <div className='cart_order_modal__form'>
                <span className='form__cooseLocation' onClick={() => setMapIsOpen(true)}>
                    <span>{t('cooseLocation')}</span>
                    <SvgSelector id={"chevron-svg"} />
                </span>
                <Form
                    form={form}
                    onFinish={(data) => onFinish(data)}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                >
                    <Select onChange={(e: any) => setRegion(e)} value={locationInfo.name || "Tashkent"} placeholder={t('region')} className='cart_order_modal__select'>
                        {regions.map(el => (
                            <Fragment key={el.id}>
                                <SelectOption value={el.name}>{el.name}</SelectOption>
                            </Fragment>
                        ))}
                    </Select>
                    <Input
                        name="district"
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
                        name="post_index"
                        type="number"
                        placeholder={t("postcode")}
                    />

                    <Button className='cart_order_modal__submitButton' isLoading={buttonIsLoading} type="primary" htmlType="submit" label={t("submit")} />
                </Form>
            </div >
        ),
        title: t('title'),
        open: orderModalOpen,
        onCancel: () => setModalIsOpen(false),
    }
    return (
        <Modal {...modalProps} />
    );
}
