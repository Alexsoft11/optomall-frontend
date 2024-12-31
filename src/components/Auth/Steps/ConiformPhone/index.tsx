import React from "react";
import styles from "./ConiformPhone.module.scss";
import GoToBack from "@/components/GoToBack";
import { Form, InputNumber, message } from "antd";
import { Button, Input } from "@/ui";
import { useTranslations } from "next-intl";
import useHandleError from "@/utils/useHandleError";
import useQueryApiClient from "@/utils/useQueryApiClient";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import {
  validateConfirmPassword,
  validateName,
  validatePassword,
  validateSixDigitNumber,
} from "../../Functions";

const ConiformPhone = () => {
  const [form] = Form.useForm();
  const t = useTranslations("");
  const [handleError] = useHandleError(form);
  const cookie = new Cookies();
  const { push, query } = useRouter();

  const { appendData: createData, isLoading } = useQueryApiClient({
    request: {
      url: "verify-otp",
      method: "POST",
      disableOnMount: true,
    },
    onSuccess(res) {
      if (!res.token) {
        message.error(t("Auth.something_wrong"));
        return;
      }
      const maxAge = 10 * 24 * 60 * 60; // 10 days in seconds

      // Set the cookie
      cookie.set("token", res.token, {
        path: "/",
        maxAge: maxAge,
      });
      push((localStorage.getItem("backUrl") as string) || "/");
      localStorage.removeItem("backUrl");
      if (res.message) {
        message.success(t(`Auth.${res.message}`));
      }
    },
    onError(res) {
      if (res.message) {
        message.error(t(`Auth.${res.message}`));
      } else {
        message.error(t("Auth.something_wrong"));
      }
    },
  });

  const onFinish = (values: any) => {
    values.id = query.id;
    values.otp = values.otp.toString();
    createData(values);
  };

  return (
    <div className={styles.main}>
      <GoToBack backUrl="/auth?step=signUp" />
      <h1>{t("Auth.info")}</h1>
      <p className={styles.desc}>{t("Auth.infoDescription")}</p>
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
            name={"otp"}
            rules={[
              {
                validator: (rule, value) => validateSixDigitNumber(t, value),
              },
            ]}
            style={{ width: "100%" }}
            validateTrigger="onBlur"
          >
            <InputNumber
              controls={false}
              placeholder={t("Auth.confirmCode")}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Input
            name="name"
            rules={[
              {
                validator: (rule, value) =>
                  validateName(t("Auth.nameValidateError"), rule, value),
              },
            ]}
            type="text"
            placeholder={t("Auth.name")}
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

          <Form.Item className={styles.submitButton}>
            <Button
              isLoading={isLoading}
              type="primary"
              htmlType="submit"
              className="generalbtn"
              label={t("Auth.save")}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ConiformPhone;
