import React, { useEffect, useRef, useState } from "react";
import styles from "./Info.module.scss";
import { Form, InputRef, message } from "antd";
import { Button, Input } from "@/ui";
import { useTranslations } from "next-intl";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { cookieBasket, validateName, validatePhone } from "../../Functions";
import GoToBack from "@/components/GoToBack";
import { useRouter } from "next/router";
import useHandleError from "@/utils/useHandleError";
import Cookies from "universal-cookie";
import { API } from "@/services/api";
import { CartItemInterface } from "@/features/Cart/interface";
import MaskedInput from "antd-mask-input";

export default function Info() {
  const [form] = Form.useForm();
  const t = useTranslations("");
  const cookie = new Cookies();
  const router = useRouter();
  const [handleError] = useHandleError(form);
  const inputRef = useRef<InputRef>(null);

  const { appendData: createData, isLoading } = useQueryApiClient({
    request: {
      url: "personal-data",
      method: "POST",
      disableOnMount: true,
    },
    onSuccess(res) {
      if (!res.token) {
        message.error('something_wrong')
        return
      }

      if (localStorage.getItem('basket-data')) {
        API.userBasketFromStorage(res.token, cookieBasket(JSON.parse(localStorage.getItem('basket-data') as string) as CartItemInterface[]))
      }
      const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds

      // Set the cookie
      cookie.set('token', res.token, {
        path: '/',
        maxAge: maxAge,
      });
      router.push("/");
    },
    onError(res) {
      handleError(res);
    },
  });

  const onFinish = (values: any) => {
    values.unique_id = router.query.id;
    values.phone = `+998${inputRef.current?.input?.value}`;
    createData(values);
  };

  return (
    <div className={styles.main}>
      <GoToBack backUrl="/auth?step=signUp" />
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
            rules={[
              { validator: (rule, value) => validateName(t("Auth.nameValidateError"), rule, value) }
            ]}
            type="text"
            className={styles.input}
            placeholder={t("Auth.name")}
          />



          <Input
            name="last_name"
            rules={[
              { validator: (rule, value) => validateName(t("Auth.nameValidateError"), rule, value) }
            ]}
            type="text"
            placeholder={t("Auth.secondName")}
          />

          <MaskedInput
            ref={inputRef}
            onBlur={() => form.submit()}
            type="text"
            prefix={"+998"}
            mask={'(00) 000-00-00'}
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
