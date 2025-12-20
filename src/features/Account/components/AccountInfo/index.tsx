/** @format */

import React, { use, useState } from "react";
import ModalForms from "../ModalForms";
import { Button, Form, message } from "antd";
import styles from "./AccounInfot.module.scss";
import UserProfile from "../UserProfile";
import Image from "next/image";
import { editAccountIcon } from "$/assets/images";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useTranslations } from "next-intl";
import { Input } from "@/ui";
import { LocationInfoInterface } from "@/components/Types";
import LocationBlock from "@/components/LocationBlock";
import { validatePhone } from "@/components/Auth/Functions";
import { MaskedInput } from "antd-mask-input";

const AccountInfo = ({ user }: any) => {
  const [mapIsOpen, setMapIsOpen] = useState(false);
  const [locationInfo, setLocationInfo] = useState<LocationInfoInterface>({
    region: "",
    district: "",
  });

  const t = useTranslations("");
  const [open, setOpen] = useState({
    isEmail: false,
    isUserName: false,
    isPhoneNumber: false,
    isResetPassword: false,
    isAddress: false,
  });

  const [loading, setLoading] = useState({
    email: false,
    name: false,
    phone: false,
    password: false,
    adress: false,
  });

  const { appendData: updateEmail } = useQueryApiClient({
    request: {
      url: "profile/update-email",
      method: "POST",
      disableOnMount: true,
    },
    onSuccess: (res) => {
      message.success(res.message);
      setOpen({ ...open, isEmail: false });
    },
  });

  const { appendData: updateName } = useQueryApiClient({
    request: {
      url: "profile/update-name",
      method: "POST",
      disableOnMount: true,
    },
    onSuccess: (res) => {
      message.success(res.message);
      setOpen({ ...open, isUserName: false });
    },
  });

  const { appendData: updatePhone } = useQueryApiClient({
    request: {
      url: "profile/update-phone",
      method: "POST",
      disableOnMount: true,
    },
    onSuccess: (res) => {
      message.success(res.message);
      setOpen({ ...open, isPhoneNumber: false });
    },
  });

  const { appendData: updatePassword } = useQueryApiClient({
    request: {
      url: "profile/update-password",
      method: "POST",
      disableOnMount: true,
    },
    onSuccess: (res) => {
      message.success(res.message);
      setOpen({ ...open, isResetPassword: false });
    },
  });
  const { appendData: updateAdress } = useQueryApiClient({
    request: {
      url: "location-form",
      method: "POST",
      disableOnMount: true,
    },
    onSuccess: (res) => {
      message.success(res.message);
      setOpen({ ...open, isAddress: false });
    },
  });

  const handleFormSubmit = async (
    mutateFunction: any,
    values: any,
    key: string
  ) => {
    setLoading((prev) => ({ ...prev, [key]: true }));
    try {
      await mutateFunction(values);
    } finally {
      setLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  const handleValues = async (e: any) => {
    try {
      await updateAdress(locationInfo);
    } catch (e) {
    }
  };
  return (
    <div>
      <div className={styles.card_info}>
        <h3>{t("GLOBAL.my_account")}</h3>
        <UserProfile user={user} />
        <div className={styles.info}>
          <div className={styles.card}>
            <p>{t("Account.mail")}</p>
            <div>
              <span>{user?.email}</span>
              <button onClick={() => setOpen({ ...open, isEmail: true })}>
                {t("Account.change")}
              </button>
              <Image
                src={editAccountIcon}
                alt="#"
                className={styles.info_arrow}
                onClick={() => setOpen({ ...open, isEmail: true })}
              />
            </div>
          </div>
          <div className={styles.card}>
            <p>{t("Account.name")}</p>
            <div>
              <span>{user?.name}</span>
              <button onClick={() => setOpen({ ...open, isUserName: true })}>
                {t("Account.change")}
              </button>
              <Image
                src={editAccountIcon}
                alt="#"
                className={styles.info_arrow}
                onClick={() => setOpen({ ...open, isUserName: true })}
              />
            </div>
          </div>
          <div className={styles.card}>
            <p>{t("Account.phone")}</p>
            <div>
              <span>{user?.phone}</span>
              <button onClick={() => setOpen({ ...open, isPhoneNumber: true })}>
                {t("Account.change")}
              </button>
              <Image
                src={editAccountIcon}
                alt="#"
                className={styles.info_arrow}
                onClick={() => setOpen({ ...open, isPhoneNumber: true })}
              />
            </div>
          </div>
          <div className={styles.card}>
            <p>{t("Auth.password")}</p>
            <div>
              <span>********</span>
              <button
                onClick={() => setOpen({ ...open, isResetPassword: true })}
              >
                {t("Account.change")}
              </button>
              <Image
                src={editAccountIcon}
                alt="#"
                className={styles.info_arrow}
                onClick={() => setOpen({ ...open, isResetPassword: true })}
              />
            </div>
          </div>
          <div className={styles.card}>
            <p>{t("Auth.address")}</p>
            <div>
              <span>{user?.district}</span>
              <button onClick={() => setOpen({ ...open, isAddress: true })}>
                {t("Account.change")}
              </button>
              <Image
                src={editAccountIcon}
                alt="#"
                className={styles.info_arrow}
                onClick={() => setOpen({ ...open, isAddress: true })}
              />
            </div>
          </div>
        </div>
      </div>
      <ModalForms
        isOpen={open.isEmail}
        onClick={() => setOpen({ ...open, isEmail: false })}
      >
        <Form
          onFinish={(values) => handleFormSubmit(updateEmail, values, "email")}
          initialValues={{ email: user?.email }}
          className={styles.form}
        >
          <Input placeholder={t("Account.mail")} name="email" />
          <Input
            type="password"
            placeholder={t("Account.password")}
            name="password"
          />
          <Button
            htmlType="submit"
            loading={loading.email}
            className={styles.confirm_btn}
          >
            {t("Account.confirm")}
          </Button>
        </Form>
      </ModalForms>
      <ModalForms
        isOpen={open.isUserName}
        onClick={() => setOpen({ ...open, isUserName: false })}
      >
        <Form
          onFinish={(values) => handleFormSubmit(updateName, values, "name")}
          initialValues={{ name: user?.name, last_name: user?.last_name }}
          className={styles.form}
        >
          <Input placeholder={t("Account.name")} name="name" />
          <Input placeholder={t("Account.lastname")} name="last_name" />
          <Form.Item>
            <Button
              htmlType="submit"
              loading={loading.name}
              className={styles.confirm_btn}
            >
              {t("Account.confirm")}
            </Button>
          </Form.Item>
        </Form>
      </ModalForms>
      <ModalForms
        isOpen={open.isPhoneNumber}
        onClick={() => setOpen({ ...open, isPhoneNumber: false })}
      >
        <Form
          onFinish={(values) => handleFormSubmit(updatePhone, values, "phone")}
          initialValues={{ phone: user?.phone }}
          className={styles.form}
        >
          <Form.Item
            name="phone"
            rules={[{ validator: (rule, value) => validatePhone(t, value) }]}
            required
          >
            <MaskedInput
              className={styles.maskedInput}
              type="text"
              prefix={"+998"}
              mask={"(00) 000-00-00"}
            />
          </Form.Item>
          <Button
            htmlType="submit"
            loading={loading.phone}
            className={styles.confirm_btn}
          >
            {t("Account.confirm")}
          </Button>
        </Form>
      </ModalForms>
      <ModalForms
        isOpen={open.isResetPassword}
        onClick={() => setOpen({ ...open, isResetPassword: false })}
      >
        <Form
          onFinish={(values) =>
            handleFormSubmit(updatePassword, values, "password")
          }
          className={styles.form}
        >
          <Input
            name="old_password"
            type="password"
            placeholder={t("Account.old_password")}
          />
          <Input name="password" placeholder={t("Account.new_password")} />
          <Input
            name="confirm_password"
            placeholder={t("Account.confirm_password")}
          />

          <Button
            htmlType="submit"
            loading={loading.password}
            className={styles.confirm_btn}
          >
            {t("Account.confirm")}
          </Button>
        </Form>
      </ModalForms>
      <ModalForms
        isOpen={open.isAddress}
        onClick={() => setOpen({ ...open, isAddress: false })}
      >
        <LocationBlock
          locationInfo={locationInfo}
          setLocationInfo={setLocationInfo}
          ILocation={{ region: user?.region, district: user?.district }}
          isShowBorder={false}
        />
        <Button
          onClick={handleValues}
          loading={loading.adress}
          className={styles.confirm_btn}
        >
          {t("Account.confirm")}
        </Button>
      </ModalForms>
    </div>
  );
};

export default AccountInfo;
