import React from "react";
import styles from "./ConiformPhone.module.scss";
import GoToBack from "@/components/GoToBack";
import { Form, message } from "antd";
import { Button, Input } from "@/ui";
import { useTranslations } from "next-intl";
import useHandleError from "@/utils/useHandleError";
import useQueryApiClient from "@/utils/useQueryApiClient";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import { validateConfirmPassword, validatePassword } from "../../Functions";

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
      // const backUrl = localStorage.getItem("backUrl");
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
    },
    onError(res) {
      message.error(t("Auth.something_wrong"));
      handleError(res);
    },
  });

  const onFinish = (values: any) => {
    values.unique_id = query.id;
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
