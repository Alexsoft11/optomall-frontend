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
}

export default function LocationBlock({
  setLocationInfo,
  locationInfo,
  ILocation,
}: Props) {
  const [form] = Form.useForm();
  const t = useTranslations("Cart");
  const [currentRegion, setcurrentRegion] =
    useState<keyof RegionProvincesInterface>();

  const selectChange = (
    value: keyof RegionProvincesInterface,
    name: keyof LocationInfoInterface
  ) => {
    let clone = { ...locationInfo };
    if (name === "region") {
      clone = { ...locationInfo, district: "" };
      setcurrentRegion(
        value.toLocaleLowerCase() as keyof RegionProvincesInterface
      );
      form.setFieldValue("district", null);
    }

    clone[name] = value;

    setLocationInfo(clone);
  };

  useEffect(() => {
    ILocation?.region
      ? regions.map((el, idx) => {
          if (el === ILocation.region) {
            form.setFieldValue("region", regions[idx]);

            regionProvinces[
              ILocation.region.toLowerCase() as keyof RegionProvincesInterface
            ].map((item) => {
              if (item === ILocation.district) {
                form.setFieldValue("district", item);
                return;
              }
            });
            return;
          }
        })
      : null;
  }, []);

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
      <div className={styles.main}>
        <div className={styles.text_block}>
          <h2>{t("address")}</h2>
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
