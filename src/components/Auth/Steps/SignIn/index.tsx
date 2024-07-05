import React, { useState } from "react";
import styles from "./SignIn.module.scss";
import { Form, message } from "antd";
import { Button, Input } from "@/ui";
import { useTranslations } from "next-intl";
import Link from "next/link";
import GoogleButton from "../../GoogleButton";
import { validateEmail, validatePassword } from "../../Functions";
import useQueryApiClient from "@/utils/useQueryApiClient";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import GoToBack from "@/components/GoToBack";
import useHandleError from "@/utils/useHandleError";

export default function SignIn() {
  const [form] = Form.useForm();
  const t = useTranslations("");
  const cookies = new Cookies();
  const expirationDate = new Date();
  const router = useRouter();
  const [handleError] = useHandleError(form);
  expirationDate.setDate(expirationDate.getDate() + 3);

  const { appendData: createData } = useQueryApiClient({
    request: {
      url: "login",
      method: "POST",
      disableOnMount: true,
    },
    onSuccess(res) {
      message.success(t(`Auth.${res.message}`));  
      setTimeout(() => router.push("/"), 2000);
      cookies.set("token", res.token);
    },
    onError(err) {
      if (err.message.includes("email")) {
        form.setFields([
          {
            name: "email",
            errors: [t(`Auth.${err.message}`)],
          },
        ]);
        return;
      }
      if (err.message.includes("password")) {
        form.setFields([
          {
            name: "password",
            errors: [t(`Auth.${err.message}`)],
          },
        ]);
        return;
      }
      handleError(err);
    },
  });

  const onFinish = (values: any) => {
    createData(values);
  };

  return (
    <div className={styles.main}>
      <GoToBack pathArr={[{ title: "signin", path: "" }]} />
      <h1>{t("Auth.signin")}</h1>
      <p className={styles.desc}>{t('Auth.signInDescription')}</p>
      <div className={styles.form}>
        <Form
          form={form}
          onFinish={(data) => onFinish(data)}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          autoComplete="off"
        >
          <Input
            name="email"
            rules={[
              { validator: (rule, value) => validateEmail(t, rule, value) },
            ]}
            type="email"
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

          <span className={styles.forgot_Password}>
            <Link href="/auth?step=forgot-password">{t("Auth.forgotPassword")}</Link>
          </span>

          <Form.Item className={styles.submitButton}>
            <Button type="primary" htmlType="submit" label={t("Auth.signin")} />
          </Form.Item>
        </Form>

        <div className={styles.not_registred}>
          <p>{t("Auth.notRegistred")}</p>
          <span>
            <Link href="/auth?step=signUp">{t("Auth.registerNow")}</Link>
          </span>
        </div>

        <GoogleButton />
      </div>
    </div>
  );
}
