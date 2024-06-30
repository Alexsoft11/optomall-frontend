import React from "react";
import styles from "./Registration.module.scss";
import { Form, Input, message } from "antd";
import { Button } from "@/ui";
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

interface Props {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Registration({ setModalIsOpen }: Props) {
  const [form] = Form.useForm();
  const t = useTranslations("Auth");
  const router = useRouter();

  const { appendData: createData } = useQueryApiClient({
    request: {
      url: "register",
      method: "POST",
      disableOnMount: true,
    },
    onSuccess(res) {
      message.success(res.message);
      setModalIsOpen(true);
      setTimeout(() => router.push("auth/"), 1500);
    },
  });

  const onFinish = (values: any) => {
    createData(values);
  };

  return (
    <div className={styles.main}>
      <GoToBack pathArr={[{ title: "registration", path: "" }]} />
      <h1>{t("regist")}</h1>
      <p className={styles.desc}>Lorem, ipsum dolor sit amet</p>
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
          <Form.Item
            name="email"
            rules={[
              {
                validator: (rule, value) => validateEmail(t, rule, value, true),
              },
            ]}
            validateTrigger={"onBlur"}
          >
            <Input
              type="email"
              className={styles.input}
              placeholder={t("email")}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { validator: (rule, value) => validatePassword(t, rule, value) },
            ]}
            hasFeedback
          >
            <Input.Password type="password" placeholder={t("yourPassword")} />
          </Form.Item>

          <Form.Item
            name="confirm_password"
            hasFeedback
            rules={[
              {
                validator: (rule, value) =>
                  validateConfirmPassword(t, form).validator(rule, value),
              },
            ]}
          >
            <Input.Password
              type="password"
              placeholder={t("repeatYourPassword")}
            />
          </Form.Item>

          <span className={styles.have_account}>
            {t("haveAccount")}

            <Link href="/auth">{t("signin")}</Link>
          </span>

          <Form.Item className={styles.submitButton}>
            <Button
              type="primary"
              htmlType="submit"
              className="generalbtn"
              label={t("regist")}
            />
          </Form.Item>
        </Form>

        <GoogleButton />
      </div>
    </div>
  );
}
