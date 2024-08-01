import React, { useEffect, useState } from 'react';
import styles from './LocationBlock.module.scss';
import { useTranslations } from 'next-intl';
import ChooseLocation from '@/components/ChooseLocation';
import { LocationInfoInterface } from '../Types';
import { Input } from '@/ui';
import { Form } from 'antd';

interface Props {
    setLocationInfo: React.Dispatch<React.SetStateAction<LocationInfoInterface>>
    locationInfo: LocationInfoInterface
}

export default function LocationBlock({ setLocationInfo, locationInfo }: Props) {
    const [form] = Form.useForm();
    const t = useTranslations('Cart')
    const [mapIsOpen, setMapIsOpen] = useState(false);

    useEffect(() => {
        form.setFieldValue('adressText', locationInfo.addressText)
    }, [locationInfo])

    const locationText = () => {
        const adressText = form.getFieldValue('adressText')
        const clone = locationInfo.url ? { ...locationInfo, addressText: adressText } : { addressText: adressText, url: "null" }
        setLocationInfo(clone)
    }


    return (
        <Form form={form}>
            <div className={styles.main}>

                {mapIsOpen ?
                    <ChooseLocation setLocationInfo={setLocationInfo} mapIsOpen={mapIsOpen} setMapIsOpen={setMapIsOpen} /> : null
                }
                <div className={styles.text_block}>
                    <h2>{t('address')}</h2>
                </div>
                <div className={styles.enter_addres}>
                    <span onClick={() => setMapIsOpen(true)}>{t('addressInMap')}</span>
                    <Input onBlur={locationText} required name='adressText' placeholder={t('enterAddres')} />
                </div>
            </div>
        </Form>
    );
}
