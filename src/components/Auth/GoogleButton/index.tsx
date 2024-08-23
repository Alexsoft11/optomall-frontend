import React from "react";
import styles from "./GoogleButton.module.scss";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { GoogleLogo } from "$/assets/images";
import { useRouter } from "next/router";
import { useGoogleLogin } from "@react-oauth/google";
import useQueryApiClient from "@/utils/useQueryApiClient";
import Cookies from "universal-cookie";
import { message } from "antd";
import { API } from "@/services/api";
import { CartItemInterface } from "@/features/Cart/interface";
import { LoadingSpinner } from "@/ui/Spin";

export default function GoogleButton() {
  const { push, query } = useRouter();
  const t = useTranslations("Auth");
  const cookie = new Cookies();

  const { appendData: createData, isLoading } = useQueryApiClient({
    request: {
      url: "google-login",
      method: "POST",
      disableOnMount: true,
    },
    onSuccess(res) {
      const backUrl = localStorage.getItem("backUrl");
      if (res.message === "add_personal_data" || !res.info_filled) {
        push(`/auth?step=info&id=${res.unique_id}`);
        return;
      }

      if (!res.token) {
        message.error(t("Auth.something_wrong"));
        return;
      }
      console.log(res);

      cookie.set("token", res.token);
      localStorage.removeItem('backUrl')
      push((backUrl as string) || "/");
    },
  });

  const handleLoginSuccess = (response: any) => {
    const accessToken = response.access_token;
    createData({ token: accessToken });
  };

  const handleLoginError = (error: any) => {
    console.log("Login Failed:", error);
  };

  const login = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
    flow: "implicit",
  });

  return (
    <div className={styles.main}>
      <LoadingSpinner spinning={isLoading} fullscreen={true} size="large" />
      <button className={styles.button} type="button" onClick={() => login()}>
        <div className={styles.img}>
          <Image fill src={GoogleLogo} alt="#" />
        </div>
        {t("continueGoogle")}
      </button>
    </div>
  );
}
