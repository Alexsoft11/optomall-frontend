import React, { useEffect, useState } from 'react';
import styles from './LocationBlock.module.scss';
import { useTranslations } from 'next-intl';
import ChooseLocation from '@/components/ChooseLocation';
import { LocationInfoInterface } from '../Types';
import LocationModal from '../LocationModal';

interface Props {
    setLocationInfo: React.Dispatch<React.SetStateAction<LocationInfoInterface>>
    locationInfo: LocationInfoInterface
}

export default function LocationBlock({ setLocationInfo, locationInfo }: Props) {
    const t = useTranslations('Cart')
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [mapIsOpen, setMapIsOpen] = useState(false);

    return (
        <div className={styles.main}>
            {modalIsOpen ? <LocationModal locationInfo={locationInfo} setLocationInfo={setLocationInfo} orderModalOpen={modalIsOpen} setMapIsOpen={setMapIsOpen} setModalIsOpen={setModalIsOpen} /> : null}

            {mapIsOpen ?
                <ChooseLocation setLocationInfo={setLocationInfo} locationInfo={locationInfo} mapIsOpen={mapIsOpen} setMapIsOpen={setMapIsOpen} /> : null
            }
            <div className={styles.text_block}>
                <h2>{t('address')}</h2>
                <p>{t('addressInMap')}</p>
            </div>
            <span onClick={() => setModalIsOpen(true)}>{t('enterAddres')}</span>
        </div>
    );
}
