import React, { useEffect, useRef, useState } from "react";
import TabPane from "antd/es/tabs/TabPane";
import NavigationCard from "../NavigationCard";
import { Tooltip } from "antd";
import { CustomTabs } from "@/ui/Tabs";
import { CategoryInterface } from "@/interfaces";
import styles from "./CatalogTab.module.scss";

interface Props {
  openModal: any;
  setOpenModal: any;
  categoryData?: CategoryInterface[];
}

const CatalogTab = ({ openModal, setOpenModal, categoryData }: Props) => {
  const [CatalogTabsData, setCatalogTabsData] = useState<CategoryInterface[]>(
    []
  );
  const [activeTab, setActiveTab] = useState("0");
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const [overflowStates, setOverflowStates] = useState<boolean[]>([]);

  useEffect(() => {
    const newOverflowStates = CatalogTabsData.map((_, index) => {
      const current = textRefs.current[index];
      return current && current.textContent
        ? current.textContent.length >= 25
        : false;
    });
    setOverflowStates(newOverflowStates);
  }, [CatalogTabsData]);

  useEffect(() => {
    if (categoryData) {
      setCatalogTabsData(categoryData);
    }
  }, [categoryData]);

  const truncateText = (text: any, maxLength: any) => {
    if (!text) return;
    if (text.length <= maxLength) {
      return text;
    } else {
      return text?.slice(0, maxLength) + "...";
    }
  };

  const handleTabChange = (key: any) => {
    setActiveTab(key);
  };

  return (
    <div
      className={`${styles.navigation} ${
        openModal === "nav" ? styles.open : ""
      }`}
    >
      <div className={styles.navigation__inner}>
        <CustomTabs
          activeKey={activeTab}
          onChange={handleTabChange}
          tabPosition="left"
          className={`${styles.navigation__tab} navigation_btn`}
        >
          {CatalogTabsData?.map((tab, idx) => (
            <TabPane
              key={idx}
              tab={
                <Tooltip
                  overlayClassName="tooltip-white"
                  title={overflowStates[idx] ? tab.name : ""}
                >
                  <p
                    ref={(el) => {
                      textRefs.current[idx] = el;
                    }}
                    className={styles.navigation__title}
                  >
                    {truncateText(tab?.name, 25)}
                  </p>
                </Tooltip>
              }
              className={styles.navigation__item}
            >
              <NavigationCard
                data={tab?.subcategories}
                setOpenModal={setOpenModal}
              />
            </TabPane>
          ))}
        </CustomTabs>
      </div>
    </div>
  );
};

export default CatalogTab;
