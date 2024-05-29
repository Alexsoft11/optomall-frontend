import React, { useState } from "react";
import styles from "./AuthPage.module.css";
import { AuAuthBackground, AuthModalSvg } from "$/assets/images";
import Image from "next/image";
import { useRouter } from "next/router";
import { ForgotPassword, Info, Registration, SignIn } from "./Steps";
import { useTranslations } from "next-intl";
import { Modal } from "@/ui";

export default function AuthPage() {
  let rout = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const t = useTranslations("Auth");

  return (
    <div>
      <div className="auth">
        <div className={styles.main}>
          <div className={styles.img}>
            <Image src={AuAuthBackground} alt="#" fill={true} />
          </div>
          {rout.query.step === "signin" || !rout.query.step  ? <SignIn /> : null}
          {rout.query.step === "regist" ? <Registration /> : null}
          {rout.query.step === "info" ? <Info /> : null}
          {rout.query.step === "forgot-password" ? (
            <ForgotPassword setModalIsOpen={setModalIsOpen} />
          ) : null}
        </div>
      </div>
      <Modal
        onCancel={setModalIsOpen}
        bgColor="#CCCCCC"
        img={AuthModalSvg}
        description={t("modalMessage")}
        open={modalIsOpen}
      />
    </div>
  );
}
