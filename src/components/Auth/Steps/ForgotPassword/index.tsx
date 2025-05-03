import React, { useRef, useState } from "react";
import styles from "./ForgotPassword.module.scss";
import { Form, Input, message, Tabs } from "antd";
import { Button } from "@/ui";
import { useTranslations } from "next-intl";
import { validateEmail, validatePhoneNumber } from "../../Functions";
import useQueryApiClient from "@/utils/useQueryApiClient";
import GoToBack from "@/components/GoToBack";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import { MaskedInput } from "antd-mask-input";

interface Props {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ForgotPassword({ setModalIsOpen }: Props) {
  const [form] = Form.useForm();
  const t = useTranslations("");
  const router = useRouter();
  const cookie = new Cookies();
  const [tab, setTab] = useState("phone");

  const { appendData: createData, isLoading } = useQueryApiClient({
    request: {
      url: "password/forgot",
      method: "POST",
      disableOnMount: true,
    },
    onSuccess() {
      router.push({ pathname: "/auth", query: { step: "reset" } });
    },
    onError(err) {
      if (typeof err.message === "string" && err.message) {
        message.error(t(`Auth.${err.message}`));
      }
    },
  });

  const onFinish = (values: any) => {
    const number = `998 ${values?.phone_number}`;
    createData({
      ...values,
      type: tab,
      phone_number: values?.phone_number ? number : "",
    });
    if (values.email) cookie.set("forgot-email", values.email);
    if (values.phone_number) cookie.set("forgot-phone", values.phone_number);
    if (tab) cookie.set("forgot-type", tab);
  };

  const tabItems = [
    {
      key: "phone",
      label: t("Auth.registerWithPhone"),
      children: (
        <Form
          form={form}
          onFinish={onFinish}
          className={styles.form}
          autoComplete="off"
        >
          <Form.Item
            name="phone_number"
            rules={[
              { validator: (rule, value) => validatePhoneNumber(t, value) },
            ]}
            required
            className={`masked_input_register ${styles.maskedInput}`}
            validateTrigger="onBlur"
          >
            <MaskedInput type="text" prefix="+998" mask="00 000 00 00" />
          </Form.Item>
          <Form.Item className={styles.submitButton}>
            <Button
              type="primary"
              htmlType="submit"
              isLoading={isLoading}
              label={t("Auth.save")}
            />
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "email",
      label: t("Auth.registerWithEmail"),
      children: (
        <Form
          form={form}
          onFinish={onFinish}
          className={styles.form}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: t("Auth.requiredEmailMessage") },
              { validator: (rule, value) => validateEmail(t, rule, value) },
            ]}
          >
            <Input
              type="email"
              className={styles.input}
              placeholder={t("email")}
            />
          </Form.Item>
          <Form.Item className={styles.submitButton}>
            <Button
              type="primary"
              htmlType="submit"
              isLoading={isLoading}
              label={t("Auth.save")}
            />
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div className={styles.main}>
      <GoToBack backUrl="/auth" />
      <h1>{t("Auth.resetPassword")}</h1>
      <Tabs
        className={styles.tabs}
        defaultActiveKey="1"
        items={tabItems}
        activeKey={tab}
        onChange={(key) => setTab(key)}
        destroyInactiveTabPane
      />
    </div>
  );
}
