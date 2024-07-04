import React, { useState } from "react";
import styles from "./Registration.module.scss";
import { Form, message } from "antd";
import { Button, Input } from "@/ui";
import GoogleButton from "../../GoogleButton";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from "../../Functions";
import { useTranslations } from "next-intl";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useRouter } from "next/router";
import Link from "next/link";
import GoToBack from "@/components/GoToBack";
import useHandleError from "@/utils/useHandleError";
import { LoadingSpinner } from "@/ui/Spin";

interface Props {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Registration({ setModalIsOpen }: Props) {
  const [form] = Form.useForm();
  const t = useTranslations("");
  const router = useRouter();
  const [handleError] = useHandleError(form);
  const [isLoading, setIsLoading] = useState(false)

  const { appendData: createData } = useQueryApiClient({
    request: {
      url: "register",
      method: "POST",
      disableOnMount: true,
    },
    onSuccess(res) {
      message.success(t(`Auth.${res.message}`));
      setModalIsOpen(true);
      setTimeout(() => router.push("auth/"), 1500);
      setIsLoading(false)
    },
    onError(res) {
      handleError(res);
      setIsLoading(false)
    },
  });

  const onFinish = (values: any) => {
    setIsLoading(true)
    createData(values);
  };

  return (
    <div className={styles.main}>
      <GoToBack pathArr={[{ title: "registration", path: "" }]} />
      <h1>{t("Auth.regist")}</h1>
      <p className={styles.desc}>{t('Auth.regisrtationDescription')}</p>
      <div className={styles.form}>
        <Form
          form={form}
          onFinish={(data) => onFinish(data)}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >

          <Input
            name="email"
            rules={[
              {
                validator: (rule, value) => validateEmail(t, rule, value, true),
              },
            ]}
            validateTrigger={"onBlur"}
            type="email"
            className={styles.input}
            placeholder={t("Auth.email")}
          />

          <Input
            name="password"
            rules={[
              {
                validator: (rule, value) => validatePassword(t, rule, value),
              },
            ]}
            type="password"
            placeholder={t("Auth.yourPassword")}
          />

          <Input
            name="confirm_password"
            rules={[
              {
                validator: (rule, value) =>
                  validateConfirmPassword(t, form).validator(rule, value),
              },
            ]}
            type="password"
            placeholder={t("Auth.repeatYourPassword")}
          />

          <span className={styles.have_account}>
            {t("Auth.haveAccount")}

            <Link href="/auth">{t("Auth.signin")}</Link>
          </span>

          <Form.Item className={styles.submitButton}>
              <Button
                type="primary"
                htmlType="submit"
                className="generalbtn load"
                label={t("Auth.regist")}
                isLoading={isLoading}
              />
          </Form.Item >

          <GoogleButton />

        </Form >
      </div >
    </div >
  );
}
