import React, { useEffect, useRef, useState } from "react";
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
import SubmitBtn from "@/components/SubmitBtn";
import Cookies from "universal-cookie";

interface Props {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Registration({ setModalIsOpen }: Props) {
  const [form] = Form.useForm();
  const t = useTranslations("");
  const [handleError] = useHandleError(form);
  const router = useRouter();

  const { appendData: createData, isLoading, isSuccess, isError } = useQueryApiClient({
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

          <div className={styles.submitButton}>
            <Button type="primary" htmlType="submit" isLoading={isLoading} className='generalbtn' label={t('Auth.regist')} />
          </div>


        </Form >
        <GoogleButton />
      </div >
    </div >
  );
}
