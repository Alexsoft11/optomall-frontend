import React, { useEffect, useState } from "react";
import styles from "./AuthPage.module.scss";
import { AuAuthBackground, AuthModalSvg } from "$/assets/images";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { Modal } from "@/ui";
import dynamic from "next/dynamic";
import LanguageSelector from "../LanguageSelector";
import Cookies from "universal-cookie";
import ConiformPhone from "./Steps/ConiformPhone";

const ForgotPassword = dynamic(() => import("./Steps/ForgotPassword"));

const Info = dynamic(() => import("./Steps/Info"));

const NewPassword = dynamic(() => import("./Steps/NewPassword"));

const Registration = dynamic(() => import("./Steps/Registration"));

const SignIn = dynamic(() => import("./Steps/SignIn"));

export default function AuthPage() {
  const { asPath, push, query } = useRouter();
  const [step, setStep] = useState<string | string[]>("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const t = useTranslations("Auth");
  const cookies = new Cookies();
  const token = cookies.get("token");
  const currentStep = query.step;

  /**
   * Check if the user is authenticated and redirect them to the main page
   */
  useEffect(() => {
    if (asPath === "/auth") push("/auth?step=signin");
    if (!currentStep) return;
    if (token && currentStep !== "reset" && currentStep !== "forgot-password") {
      push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, currentStep]);

  /**
   * Set the current step of the auth process
   */
  useEffect(() => {
    if (currentStep) {
      setStep(currentStep);
    }
  }, [currentStep]);

  return (
    <div>
      <div className="auth">
        <div className={styles.main}>
          <div className={styles.img}>
            <Image src={AuAuthBackground} alt="#" fill={true} />
          </div>
          <div className={`${styles.forms_side} container`}>
            <div className={styles.language_selector__block}>
              <LanguageSelector />
            </div>
            {step === "signin" ? <SignIn /> : null}
            {step === "signUp" ? (
              <Registration setModalIsOpen={setModalIsOpen} />
            ) : null}
            {step === "info" && query.id ? <Info /> : null}
            {step === "reset" ? <NewPassword /> : null}
            {step === "forgot-password" ? (
              <ForgotPassword setModalIsOpen={setModalIsOpen} />
            ) : null}
            {step === "coniform" && <ConiformPhone />}
          </div>
        </div>
      </div>
      <Modal
        onCancel={setModalIsOpen}
        className="bg_white"
        img={AuthModalSvg}
        description={t("modalMessage")}
        open={modalIsOpen}
      />
    </div>
  );
}
