/*************  ✨ Codeium Command 🌟  *************/
/**
 * LocationBlock component
 * @component
 * @prop {function} setLocationInfo - sets location info to the state
 * @prop {LocationInfoInterface} locationInfo - current location info
 * @prop {ILocation} ILocation - location info with initial values
 * @prop {boolean} isShowBorder - is show border around the component
 * @returns {ReactNode} - component
 */
import React, { Fragment, useEffect, useState } from "react";
import styles from "./LocationBlock.module.scss";
import { useTranslations } from "next-intl";
import { LocationInfoInterface } from "../Types";
import { Select } from "@/ui";
import { Form } from "antd";
import { regionProvinces, regions } from "@/constants/location";
import { Option } from "antd/es/mentions";
import { RegionProvincesInterface } from "@/interfaces";
interface ILocation {
  region: string;
  district: string;
}
interface Props {
  setLocationInfo: React.Dispatch<React.SetStateAction<LocationInfoInterface>>;
  locationInfo: LocationInfoInterface;
  ILocation?: ILocation;
  isShowBorder?: boolean;
}

export default function LocationBlock({
  setLocationInfo,
  locationInfo,
  ILocation,
  isShowBorder = true,
}: Props) {
  const [form] = Form.useForm();
  const t = useTranslations("Cart");
  const [currentRegion, setCurrentRegion] =
    useState<keyof RegionProvincesInterface>();

  /**
   * Handles select change event
   * @param {string} value - value of the select
   * @param {string} name - name of the select
   */
  const selectChange = (
    value: keyof RegionProvincesInterface,
    name: keyof LocationInfoInterface
  ) => {
    let clone = { ...locationInfo };
    if (name === "region") {
      clone = { ...locationInfo, district: "" };
      setCurrentRegion(
        value.toLocaleLowerCase() as keyof RegionProvincesInterface
      );
      form.setFieldValue("district", null);
    }

    clone[name] = value;

    setLocationInfo(clone);
  };

  useEffect(() => {
    locationInfo?.region
      ? regions.map((el, idx) => {
          if (el === locationInfo.region) {
            form.setFieldValue("region", regions[idx]);
            setCurrentRegion(
              regions[idx].toLocaleLowerCase() as keyof RegionProvincesInterface
            );
            regionProvinces[
              locationInfo.region.toLowerCase() as keyof RegionProvincesInterface
            ].map((item) => {
              if (item === locationInfo.district) {
                form.setFieldValue("district", item);
                return;
              }
            });
            return;
          }
        })
      : null;
  }, []);

  /**
   * Props for region select
   */
  const regionSelectProps = {
    className: styles.select,
    placeholder: t("selectRegion"),
    showSearch: true,
    optionFilterProp: "children",
    children: regions.map((el, idx) => (
      <Fragment key={idx}>
        <Option value={el}>{el}</Option>
      </Fragment>
    )),
    onChange: (e: keyof RegionProvincesInterface) => selectChange(e, "region"),
  };

  /**
   * Props for district select
   */
  const districtSelectProps = {
    className: styles.select,
    placeholder: t("selectDistrict"),
    showSearch: true,
    optionFilterProp: "children",
    children:
      regionProvinces[currentRegion as keyof RegionProvincesInterface]?.map(
        (el, idx) => (
          <Fragment key={idx}>
            <Option value={el}>{el}</Option>
          </Fragment>
        )
      ) || null,
    onChange: (e: keyof RegionProvincesInterface) =>
      selectChange(e, "district"),
  };

  return (
    <Form form={form}>
      <div className={`${styles.main} ${isShowBorder && styles.border}`}>
        <div className={styles.text_block}>
          <h2>{t("address")}</h2>
        </div>
        <div style={{ 
            padding: '12px', 
            backgroundColor: '#fffbe6', 
            border: '1px solid #ffe58f', 
            borderRadius: '6px', 
            marginBottom: '16px', 
            fontWeight: 600, 
            fontSize: '14px', 
            lineHeight: '1.5',
            color: '#faad14' // darkish yellow/orange text for visibility
        }}>
           <span style={{ color: '#000' }}>{t("bts_emu_notice")}</span>
        </div>
        <div className={styles.enter_addres}>
          <Form.Item name="region">
            <Select {...regionSelectProps} />
          </Form.Item>
          <Form.Item name="district">
            <Select {...districtSelectProps} />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
}
