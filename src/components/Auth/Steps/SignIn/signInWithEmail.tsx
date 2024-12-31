import React from "react";
import styles from "./SignIn.module.scss";
import { Form } from "antd";
import { Button, Input } from "@/ui";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { validateEmail, validatePassword } from "../../Functions";
import { FormInstance } from "antd/lib";

interface Props {
  form: FormInstance<any>;
  isLoading: boolean;
  createData: (data?: any, urlParams?: any, passOnSuccess?: any) => void;
}

export default function SignInWithEmail({
  createData,
  form,
  isLoading,
}: Props) {
  const t = useTranslations("");

  const onFinish = (values: any) => {
    createData(values);
  };

  return (
    <Form
      form={form}
      onFinish={(data) => onFinish(data)}
      name="signinWithEmail"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      autoComplete="off"
    >
      <Input
        name="email"
        rules={[{ validator: (rule, value) => validateEmail(t, rule, value) }]}
        type="email"
        placeholder={t("Auth.email")}
      />

      <Input
        name="password"
        rules={[
          { validator: (rule, value) => validatePassword(t, rule, value) },
        ]}
        type="password"
        placeholder={t("Auth.yourPassword")}
      />

      <span className={styles.forgot_Password}>
        <Link href="/auth?step=forgot-password">
          {t("Auth.forgotPassword")}
        </Link>
      </span>

      <Form.Item className={styles.submitButton}>
        <Button
          isLoading={isLoading}
          type="primary"
          htmlType="submit"
          label={t("Auth.signin")}
        />
      </Form.Item>
    </Form>
  );
}
