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
        form.setFieldValue('adressText', locationInfo.adressText)
    }, [locationInfo])
    

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
                    <Input onBlur={() => setLocationInfo({adressText: form.getFieldValue('adressText')})} required name='adressText' placeholder={t('enterAddres')} />
                </div>
            </div>
        </Form>
    );
}
