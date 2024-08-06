import React, { Fragment, useState } from 'react';
import styles from './LocationBlock.module.scss';
import { useTranslations } from 'next-intl';
import { LocationInfoInterface } from '../Types';
import { Select } from '@/ui';
import { Form } from 'antd';
import { regionProvinces, regions } from '@/constants/location';
import { Option } from 'antd/es/mentions';
import { RegionProvincesInterface } from '@/interfaces';

interface Props {
    setLocationInfo: React.Dispatch<React.SetStateAction<LocationInfoInterface>>
    locationInfo: LocationInfoInterface
}

export default function LocationBlock({ setLocationInfo, locationInfo }: Props) {
    const [form] = Form.useForm();
    const t = useTranslations('Cart')
    const [currentRegion, setcurrentRegion] = useState<keyof RegionProvincesInterface>()

    const selectChange = (value: keyof RegionProvincesInterface, name: keyof LocationInfoInterface) => {
        setcurrentRegion(value)
        const clone = Object.assign(locationInfo, {})
        clone[name] = value
        setLocationInfo(clone)
    }

    const citySelectProps = {
        className: styles.select,
        placeholder: 'Select a city',
        showSearch: true,
        optionFilterProp: 'children',
        children: regions.map((el, idx) => (
            <Fragment key={idx}>
                <Option value={el.value} >
                    {el.label}
                </Option>
            </Fragment>
        )),
        onChange: (e: keyof RegionProvincesInterface) => selectChange(e, 'region'),
    };

    const streetSelectProps = {
        className: styles.select,
        placeholder: 'Select a street',
        showSearch: true,
        optionFilterProp: 'children',
        children: regionProvinces[currentRegion as keyof RegionProvincesInterface]?.map((el, idx) => (
            <Fragment key={idx}>
                <Option value={el.value} >
                    {el.label}
                </Option>
            </Fragment>
        )) || null,
        onChange: (e: keyof RegionProvincesInterface) => selectChange(e, 'district'),
    };



    return (
        <Form form={form}>
            <div className={styles.main}>
                <div className={styles.text_block}>
                    <h2>{t('address')}</h2>
                </div>
                <div className={styles.enter_addres}>
                    <Select {...citySelectProps} />
                    <Select {...streetSelectProps} />
                </div>
            </div>
        </Form>
    );
}
