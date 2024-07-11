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

const ForgotPassword = dynamic(() => import("./Steps/ForgotPassword"),
  // {
  //   loading: () => <Loader />,
  // }
);

const Info = dynamic(() => import("./Steps/Info"),
  // {
  //   loading: () => <Loader />,
  // }
);

const NewPassword = dynamic(() => import("./Steps/NewPassword"),
  // {
  //   loading: () => <Loader />,
  // }
);

const Registration = dynamic(() => import("./Steps/Registration"),
  // {
  //   loading: () => <Loader />,
  // }
);

const SignIn = dynamic(() => import("./Steps/SignIn"),
  // {
  //   loading: () => <Loader />,
  // }
);

export default function AuthPage() {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const t = useTranslations("Auth");
  const cookies = new Cookies();
  const token = cookies.get('token');
  const currentStep = router.query.step;

  useEffect(() => {
    if (router.asPath === '/auth') router.push('/auth?step=signin')
    if (!currentStep) return;
    if (token && currentStep !== "reset" && currentStep !== "forgot-password") {
      router.push('/');
    }
  }, [token, currentStep]);

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
            {router.query.step === "signin" ? <SignIn /> : null}
            {router.query.step === "signUp" ? <Registration setModalIsOpen={setModalIsOpen} /> : null}
            {router.query.step === "info" && router.query.id ? <Info /> : null}
            {router.query.step === "reset" ? <NewPassword /> : null}
            {router.query.step === "forgot-password" ? <ForgotPassword setModalIsOpen={setModalIsOpen} /> : null}
          </div>
        </div>
      </div>
      <Modal
        onCancel={setModalIsOpen}
        className='bg_white'
        img={AuthModalSvg}
        description={t("modalMessage")}
        open={modalIsOpen}
      />
    </div>
  );
}
