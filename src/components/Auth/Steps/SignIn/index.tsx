import React from "react";
import styles from "./SignIn.module.scss";
import { Form, Tabs, message } from "antd";
import { useTranslations } from "next-intl";
import GoToBack from "@/components/GoToBack";
import GoogleButton from "../../GoogleButton";
import SignInWithPhone from "./signInWithPhone";
import SignInWithEmail from "./signInWithEmail";
import useQueryApiClient from "@/utils/useQueryApiClient";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";
import useHandleError from "@/utils/useHandleError";
import Link from "next/link";

export default function SignIn() {
  const [form] = Form.useForm();
  const t = useTranslations("");
  const { push } = useRouter();
  const cookie = new Cookies();
  const [handleError] = useHandleError(form);

  const { appendData: createData, isLoading } = useQueryApiClient({
    request: {
      url: "login",
      method: "POST",
      disableOnMount: true,
    },
    onSuccess(res) {
      if (res.message === "add_personal_data") {
        push(`/auth?step=info&id=${res.unique_id}`);
        return;
      }
      if (!res.token) {
        message.error(t("Auth.something_wrong"));
        return;
      }

      const maxAge = 10 * 24 * 60 * 60; // 10 days in seconds
      cookie.set("token", res.token, { path: "/", maxAge });

      push((localStorage.getItem("backUrl") as string) || "/");
      localStorage.removeItem("backUrl");
    },
    onError(err) {
      if (err.message.includes("email")) {
        form.setFields([
          {
            name: "email",
            errors: [t(`Auth.${err.message}`)],
          },
        ]);
      } else if (err.message.includes("password")) {
        form.setFields([
          {
            name: "password",
            errors: [t(`Auth.${err.message}`)],
          },
        ]);
      } else if (err.message.includes("verify_email")) {
        form.setFields([
          {
            name: "email",
            errors: [t(`Auth.${err.message}`)],
          },
        ]);
        return;
      } else if (err.message.includes("phone")) {
        form.setFields([
          {
            name: "phone_number",
            errors: [t(`Auth.${err.message}`)],
          },
        ]);
        return;
      } else if (typeof err.message === "string" && err.message) {
        message.error(t(`Auth.${err.message}`));
        return;
      }
      handleError(err);
    },
  });

  const tabItems = [
    {
      key: "1",
      label: t("Auth.registerWithPhone"),

      children: (
        <SignInWithPhone
          form={form}
          isLoading={isLoading}
          createData={createData}
        />
      ),
    },
    {
      key: "2",
      label: t("Auth.registerWithEmail"),
      children: (
        <SignInWithEmail
          form={form}
          isLoading={isLoading}
          createData={createData}
        />
      ),
    },
  ];

  return (
    <div className={styles.main}>
      <GoToBack pathArr={[{ title: "signin", path: "" }]} />
      <h1>{t("Auth.signin")}</h1>
      <p className={styles.desc}>{t("Auth.signInDescription")}</p>
      <div className={styles.form}>
        <Tabs
          className={`${styles.tabs} register-tab`}
          defaultActiveKey="1"
          items={tabItems}
          destroyInactiveTabPane={true}
        />
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
