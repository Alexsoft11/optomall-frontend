import React, { useEffect, useRef, useState } from 'react'
import TabPane from 'antd/es/tabs/TabPane';
import NavigationCard from '../NavigationCard';
import { Tooltip, message } from 'antd';
import { CustomTabs } from '@/ui/Tabs';
import useQueryApiClient from '@/utils/useQueryApiClient';
import { CategoryCatalogInterface, SubCategoryInterface } from '@/interfaces';
import styles from './CatalogTab.module.scss'

interface Props {
    openModal: any;
    setOpenModal: any;
}

const CatalogTab = ({ openModal, setOpenModal }: Props) => {
    const [CatalogTabsData, setCatalogTabsData] = useState<CategoryCatalogInterface[]>([]);
    const [subCategoryData, setSubCategoryData] = useState<SubCategoryInterface[]>([]);
    const [isOverflowed, setIsOverflowed] = useState(false);
    const [activeTab, setActiveTab] = useState('1');
    const textRef = useRef<any>(null);

    useEffect(() => {
        const { current } = textRef;
        if (current) {
            setIsOverflowed(current.scrollHeight > current.clientHeight);
        }
    }, [textRef, CatalogTabsData]);

    const { appendData: getCategoryData } = useQueryApiClient({
        request: {
            url: 'categories-from-taobao',
            method: 'GET',
        },
        onSuccess(res) {
            setCatalogTabsData(res.categories)
        },
    })

    const { appendData: getSubCategoryData } = useQueryApiClient({
        request: {
            url: `sub-categories-from-taobao?categoryId=${activeTab}`,
            method: 'GET',
            disableOnMount: true,
        },
        onSuccess(res) {
        setSubCategoryData(res)
        },
    })

    const handleTabChange = (key: any) => {
        setActiveTab(key);
        getSubCategoryData();
    };

    return (
        <div className={`${styles.navigation} ${openModal === 'nav' ? styles.open : ''}`}>
            <div className={styles.navigation__inner}>
            <CustomTabs
                activeKey={activeTab}
                onChange={handleTabChange}
                tabPosition="left"
                className={`${styles.navigation__tab} navigation_btn`}
            >
                {CatalogTabsData.map(tab => (
                <TabPane
                    key={tab.id}
                    tab={tab.name}
                    className={styles.navigation__item}
                >
                    <NavigationCard data={subCategoryData} setOpenModal={setOpenModal} />
                </TabPane>
                ))}
            </CustomTabs>
            </div>
        </div>
    );
}

export default CatalogTab;
