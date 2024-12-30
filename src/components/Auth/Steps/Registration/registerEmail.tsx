import { Button, Input } from "@/ui";
import { Form, message } from "antd";
import React from "react";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from "../../Functions";
import Link from "next/link";
import { useTranslations } from "next-intl";
import useHandleError from "@/utils/useHandleError";
import { useRouter } from "next/router";
import useQueryApiClient from "@/utils/useQueryApiClient";
import styles from "./Registration.module.scss";

interface Props {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const RegisterWithEmail = ({ setModalIsOpen }: Props) => {
  const [form] = Form.useForm();
  const t = useTranslations("");
  const [handleError] = useHandleError(form);
  const router = useRouter();

  const { appendData: createData, isLoading } = useQueryApiClient({
    request: {
      url: "register",
      method: "POST",
      disableOnMount: true,
    },
    onSuccess(res) {
      message.success(t(`Auth.${res.message}`));
      setTimeout(() => {
        setModalIsOpen(true);
        router.push("/auth");
      }, 2000);
    },
    onError(res) {
      handleError(res);
    },
  });

  const onFinish = (values: any) => {
    createData(values);
  };
  return (
    <>
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
        className={styles.form_email}
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
          validateTrigger={"onBlur"}
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
          validateTrigger={"onBlur"}
        />

        <span className={styles.have_account}>
          {t("Auth.haveAccount")}
          <Link href="/auth">{t("Auth.signin")}</Link>
        </span>

        <div className={styles.submitButton}>
          <Button
            type="primary"
            htmlType="submit"
            isLoading={isLoading}
            className="generalbtn"
            label={t("Auth.regist")}
          />
        </div>
      </Form>
    </>
  );
};

export default RegisterWithEmail;
