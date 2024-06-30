import React, { ReactEventHandler, useState } from "react";
import styles from "./Info.module.scss";
import { Form, message } from "antd";
import { Button, Input } from "@/ui";
import { useTranslations } from "next-intl";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { validatePhone } from "../../Functions";
import GoToBack from "@/components/GoToBack";
import { useRouter } from "next/router";
import useHandleError from "@/utils/useHandleError";
import Cookies from "universal-cookie";

export default function Info() {
  const [form] = Form.useForm();
  const t = useTranslations("");
  const expirationDate = new Date();
  const cookies = new Cookies();
  const router = useRouter();
  const [handleError] = useHandleError(form);
  const [isLoading, setIsLoading] = useState(false)

  const { appendData: createData } = useQueryApiClient({
    request: {
      url: "personal-data",
      method: "POST",
      disableOnMount: true,
    },
    onSuccess(res) {
      message.success(t(`Error.${res.message}`));
      router.push("/");
      cookies.set("token", Buffer.from(res.token).toString("base64"), {
        expires: expirationDate,
      });
      setIsLoading(false)
    },
    onError(res) {
      handleError(res);
      setIsLoading(false)
    },
  });

  const onFinish = (values: any) => {
    values.unique_id = router.query.id;
    createData(values);
  };

  return (
    <div className={styles.main}>
      <GoToBack backUrl="/auth?step=regist" />
      <h1>{t("Auth.info")}</h1>
      <p className={styles.desc}>{t('Auth.infoDescription')}</p>
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
            name="name"
            rules={[{ required: true, message: t("Auth.requiredNameMessage") }]}
            type="text"
            className={styles.input}
            placeholder={t("Auth.name")}
          />



          <Input
            name="last_name"
            rules={[
              { required: true, message: t("requiredSecondNameMessage") },
            ]}
            type="text"
            placeholder={t("Auth.secondName")}
          />



          <Input
            name="phone"
            rules={[
              { validator: (rule, value) => validatePhone(t, rule, value) },
            ]}
            type="text"
            prefix={"+998"}
            placeholder={"-- --- -- --"}
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
}
