import React, { useState, useEffect } from 'react';
import style from './ChooseLocation.module.scss';
import { YMaps, Map, GeolocationControl, Placemark } from '@pbe/react-yandex-maps';
import { Button } from 'antd';
import { useTranslations } from 'next-intl';

interface Props {
    onLocationSelect: (url: string) => void,
    setMapIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setCountry: React.Dispatch<React.SetStateAction<string | null>>,
}

const ChooseLocation = ({ onLocationSelect, setMapIsOpen, setCountry }: Props) => {
    const [position, setPosition] = useState<[number, number]>([55.751574, 37.573856]); // Default position (Moscow)
    const t = useTranslations('ChooseLocation');
    const [ymapsLoaded, setYmapsLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.ymaps) {
            window.ymaps.ready(() => {
                setYmapsLoaded(true);
            });
        }
    }, []);

    const getCountryName = async (coords: [number, number]) => {
        return new Promise<string>((resolve, reject) => {
            if (ymapsLoaded) {
                window.ymaps.geocode(coords).then((res: any) => {
                    const geoObject = res.geoObjects.get(0);
                    const country = geoObject.getCountry();
                    resolve(country);
                    setCountry(country);
                }).catch((error: any) => {
                    reject(error);
                });
            } else {
                reject('YMaps is not loaded');
            }
        });
    };

    const handleMapClick = async (e: any) => {
        const coords = e.get('coords');
        setPosition(coords);
        createYandexMapsUrl(coords[1], coords[0]);
        getCountryName(coords);
    };

    const handleGeolocationClick = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setPosition([longitude, latitude]);
                getCountryName([longitude, latitude]);
                createYandexMapsUrl(longitude, latitude);
            },
            (error) => {
                console.error('Error getting geolocation:', error);
            }
        );
    };

    const createYandexMapsUrl = (lon: number, lat: number) => {
        onLocationSelect(`https://yandex.com/maps?ll=${lon},${lat}&rtext=${lat},${lon}&rtt=mt&z=18`);
    };

    return (
        <div className={style.mapBlock}>
            <div className={style.map_block}>
                <YMaps query={{ apikey: "b14d6563-5fe8-4fef-8a47-d4ea235cda5a" }}>
                    <Map
                        defaultState={{ center: [55.751574, 37.573856], zoom: 6 }}
                        width="100%"
                        height="400px"
                        onClick={handleMapClick}
                    >
                        <Placemark geometry={position} />
                        <GeolocationControl onClick={handleGeolocationClick} options={{ float: 'right' }} />
                    </Map>
                </YMaps>
            </div>
            <div className={style.close_btn__block}>
                <Button onClick={() => setMapIsOpen(false)}>
                    {t('close')}
                </Button>
                <Button onClick={() => setMapIsOpen(false)}>
                    {t('submit')}
                </Button>
            </div>
        </div>
    );
};

export default ChooseLocation;
