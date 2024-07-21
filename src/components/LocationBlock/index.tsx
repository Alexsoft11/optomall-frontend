import React, { useState } from 'react';
import styles from './LocationBlock.module.scss';
import { useTranslations } from 'next-intl';
import ChooseLocation from '@/components/ChooseLocation';
import { LocationInfoInterface } from '../Types';
import LocationModal from '../LocationModal';

interface Props {
    setLocation: React.Dispatch<any>,
    setCountry: React.Dispatch<React.SetStateAction<string | null>>,
}

export default function LocationBlock({ setLocation, setCountry }: Props) {
    const t = useTranslations('Cart')
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [mapIsOpen, setMapIsOpen] = useState(false);
    const [locationInfo, setLocationInfo] = useState<LocationInfoInterface | null>(null)

    const handleLocationSelect = (url: string) => {
        setLocation(url);
    };

    return (
        <div className={styles.main}>
            {modalIsOpen ? <LocationModal locationInfo={locationInfo} orderModalOpen={modalIsOpen} setMapIsOpen={setMapIsOpen} setModalIsOpen={setModalIsOpen} /> : null}

            {mapIsOpen ?
                <ChooseLocation setLocationInfo={setLocationInfo} mapIsOpen={mapIsOpen} setCountry={setCountry} setMapIsOpen={setMapIsOpen} onLocationSelect={handleLocationSelect} /> : null
            }
            <div className={styles.text_block}>
                <h2>{t('address')}</h2>
                <p>{t('addressInMap')}</p>
            </div>
            <span onClick={() => setModalIsOpen(true)}>{t('enterAddres')}</span>
        </div>
    );
}
