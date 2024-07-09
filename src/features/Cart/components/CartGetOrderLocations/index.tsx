import React, { useState } from 'react';
import styles from './CartGetOrderLocations.module.scss';
import { useTranslations } from 'next-intl';
import ChooseLocation from '@/components/ChooseLocation';

interface Props {
    setLocation: React.Dispatch<any>,
    setCountry:  React.Dispatch<React.SetStateAction<string | null>>,
}

export default function CartGetOrderLocations({setLocation, setCountry}: Props) {
    const t = useTranslations('Cart')
    const [mapIsOpen, setMapIsOpen] = useState(false);

    const handleLocationSelect = (url: string) => {
        setLocation(url);
    };

    return (
        <div className={styles.main}>
            {mapIsOpen ?
                <ChooseLocation setCountry={setCountry} setMapIsOpen={setMapIsOpen} onLocationSelect={handleLocationSelect} /> : null
            }
            <div className={styles.text_block}>
                <h2>{t('address')}</h2>
                <p>{t('addressInMap')}</p>
            </div>
            <span onClick={() => setMapIsOpen(true)}>{t('enterAddres')}</span>
        </div>
    );
}
