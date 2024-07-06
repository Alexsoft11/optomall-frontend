/** @format */

import React, { useState } from "react";
import ModalForms from "../ModalForms";
import { Button, Form, message } from "antd";
import styles from "./AccounInfot.module.scss";
import UserProfile from "../UserProfile";
import Image from "next/image";
import { editAccountIcon } from "$/assets/images";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useTranslations } from "next-intl";
import { Input } from "@/ui";

const AccountInfo = ({ user }: any) => {
  const t = useTranslations("");
  const [open, setOpen] = useState({
    isEmail: false,
    isUserName: false,
    isPhoneNumber: false,
    isResetPassword: false,
  });

  const [loading, setLoading] = useState({
    email: false,
    name: false,
    phone: false,
    password: false,
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

  const handleFormSubmit = async (
    mutateFunction: any,
    values: any,
    key: string
  ) => {
    setLoading((prev) => ({ ...prev, [key]: true }));
    try {
      console.log(values);
      // await mutateFunction(values);
    } finally {
      setLoading((prev) => ({ ...prev, [key]: false }));
    }
  };

  return (
    <div>
      <div className={styles.card_info}>
        <h3>Мой аккаунт</h3>
        <UserProfile user={user} />
        <div className={styles.info}>
          <div className={styles.card}>
            <p>{t("Account.mail")}</p>
            <div>
              <span>{user?.email}</span>
              <button>{t("Account.change")}</button>
              <Image
                src={editAccountIcon}
                alt='#'
                className={styles.info_arrow}
                onClick={() => setOpen({ ...open, isEmail: true })}
              />
            </div>
          </div>
          <div className={styles.card}>
            <p>{t("Account.name")}</p>
            <div>
              <span>{user?.name}</span>
              <button>{t("Account.change")}</button>
              <Image
                src={editAccountIcon}
                alt='#'
                className={styles.info_arrow}
                onClick={() => setOpen({ ...open, isUserName: true })}
              />
            </div>
          </div>
          <div className={styles.card}>
            <p>{t("Account.phone")}</p>
            <div>
              <span>{user?.phone}</span>
              <button>{t("Account.change")}</button>
              <Image
                src={editAccountIcon}
                alt='#'
                className={styles.info_arrow}
                onClick={() => setOpen({ ...open, isPhoneNumber: true })}
              />
            </div>
          </div>
          <div className={styles.card}>
            <p>{t("Auth.password")}</p>
            <div>
              <span>********</span>
              <button>{t("Account.change")}</button>
              <Image
                src={editAccountIcon}
                alt='#'
                className={styles.info_arrow}
                onClick={() => setOpen({ ...open, isResetPassword: true })}
              />
            </div>
          </div>
        </div>
      </div>
      <ModalForms
        isOpen={open.isEmail}
        onClick={() => setOpen({ ...open, isEmail: false })}>
        <Form
          onFinish={(values) => handleFormSubmit(updateEmail, values, "email")}
          initialValues={{ email: user?.email }}
          className={styles.form}>
          <Input placeholder={t("Account.mail")} name='email' />
          <Input
            type='password'
            placeholder={t("Account.password")}
            name='password'
          />
          <Button
            htmlType='submit'
            loading={loading.email}
            className={styles.confirm_btn}>
            {t("Account.confirm")}
          </Button>
        </Form>
      </ModalForms>
      <ModalForms
        isOpen={open.isUserName}
        onClick={() => setOpen({ ...open, isUserName: false })}>
        <Form
          onFinish={(values) => handleFormSubmit(updateName, values, "name")}
          initialValues={{ name: user?.name }}
          className={styles.form}>
          <Input placeholder={t("Account.name")} name='name' />
          <Form.Item>
            <Button
              htmlType='submit'
              loading={loading.name}
              className={styles.confirm_btn}>
              {t("Account.confirm")}
            </Button>
          </Form.Item>
        </Form>
      </ModalForms>
      <ModalForms
        isOpen={open.isPhoneNumber}
        onClick={() => setOpen({ ...open, isPhoneNumber: false })}>
        <Form
          onFinish={(values) => handleFormSubmit(updatePhone, values, "phone")}
          initialValues={{ phone: user?.phone }}
          className={styles.form}>
          <Input placeholder={t("Account.phone")} name='phone' type='number' />
          <Button
            htmlType='submit'
            loading={loading.phone}
            className={styles.confirm_btn}>
            {t("Account.confirm")}
          </Button>
        </Form>
      </ModalForms>
      <ModalForms
        isOpen={open.isResetPassword}
        onClick={() => setOpen({ ...open, isResetPassword: false })}>
        <Form
          onFinish={(values) =>
            handleFormSubmit(updatePassword, values, "password")
          }
          className={styles.form}>
          <Input name='password' type='password' placeholder='New password' />
          <Input name='confirm_password' placeholder='Confirm password' />
          <Button
            htmlType='submit'
            loading={loading.password}
            className={styles.confirm_btn}>
            {t("Account.confirm")}
          </Button>
        </Form>
      </ModalForms>
    </div>
  );
};

export default AccountInfo;
