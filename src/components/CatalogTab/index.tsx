import React, { useEffect, useRef, useState } from "react";
import TabPane from "antd/es/tabs/TabPane";
import NavigationCard from "../NavigationCard";
import { Tooltip, message } from "antd";
import { CustomTabs } from "@/ui/Tabs";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { CategoryCatalogInterface, SubCategoryInterface } from "@/interfaces";
import styles from "./CatalogTab.module.scss";

interface Props {
  openModal: any;
  setOpenModal: any;
}

const CatalogTab = ({ openModal, setOpenModal }: Props) => {
  const [CatalogTabsData, setCatalogTabsData] = useState<
    CategoryCatalogInterface[]
  >([]);
  const [subCategoryData, setSubCategoryData] = useState<
    SubCategoryInterface[]
  >([]);
  const [activeTab, setActiveTab] = useState("1");
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

  const truncateText = (text: any, maxLength: any) => {
    if (text?.length <= maxLength) {
      return text;
    } else {
      return text?.slice(0, maxLength) + "...";
    }
  };

  const { appendData: getCategoryData } = useQueryApiClient({
    request: {
      url: "categories-from-taobao",
      method: "GET",
    },
    onSuccess(res) {
      setCatalogTabsData(res.categories);
      getSubCategoryData(null, { key: res?.categories[0]?.id });
    },
  });

  const { appendData: getSubCategoryData, isLoading: isSubCategoryLoading } =
    useQueryApiClient({
      request: {
        url: `sub-categories-from-taobao?categoryId=:key`,
        method: "GET",
        disableOnMount: true,
      },
      onSuccess(res) {
        setSubCategoryData(res);
      },
    });

  const handleTabChange = (key: any) => {
    setActiveTab(key);
    getSubCategoryData(null, { key });
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
          {CatalogTabsData.map((tab, idx) => (
            <TabPane
              key={tab.id}
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
                isSubCategoryLoading={isSubCategoryLoading}
                data={subCategoryData}
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
