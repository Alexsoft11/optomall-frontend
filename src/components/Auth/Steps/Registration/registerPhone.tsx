import { Form, InputRef, message } from "antd";
import React, { useRef, useState } from "react";
import { validatePhoneNumber } from "../../Functions";
import styles from "./Registration.module.scss";
import { MaskedInput } from "antd-mask-input";
import { Button, Checkbox, Modal } from "@/ui";
import Link from "next/link";
import { Verify } from "react-puzzle-captcha";
import { useTranslations } from "next-intl";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useRouter } from "next/router";

const RegisterWithPhone = () => {
  const inputRef = useRef<InputRef>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { push, locale } = useRouter();
  const t = useTranslations("");

  const { appendData, isLoading } = useQueryApiClient({
    request: {
      url: "send-otp",
      method: "POST",
      disableOnMount: true,
    },
    onSuccess(res) {
      push(`/${locale}/auth?step=coniform&id=${res.id}`);
      message.success(t(`Auth.${res.message}`));
    },
    onError(res) {
      if (res.message.includes("phone")) {
        form.setFields([
          {
            name: "phone_number",
            errors: [t(`Auth.${res.message}`)],
          },
        ]);
      } else if (res.message) {
        message.warning(t(`Auth.${res.message}`));
      }
    },
  });

  const handleShow = (value: boolean) => {
    if (value) {
      setVisible(true);
    }
  };

  const onPhoneRegister = (values: any) => {
    if (!isVerified) {
      message.error(t("captcha.warningMessage"));
      return;
    }
    const number = `998 ${values?.phone_number}`;
    appendData({ phone_number: number });
  };

  const handleVerify = () => {
    setIsVerified(true);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={(data) => onPhoneRegister(data)}
        name="phoneRegister"
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
        className={styles.form_phone}
      >
        <Form.Item
          name="phone_number"
          rules={[
            { validator: (rule, value) => validatePhoneNumber(t, value) },
          ]}
          required
          className={`masked_input_register ${styles.maskedInput}`}
          validateTrigger={"onBlur"}
        >
          <MaskedInput
            ref={inputRef}
            type="text"
            prefix={"+998"}
            mask={"00 000 00 00"}
            inputMode="numeric"
          />
        </Form.Item>

        <Checkbox
          onChange={(e) => handleShow(e.target.checked)}
          label={t("captcha.checkboxText")}
          checked={isVerified}
        />

        <span className={styles.have_account}>
          {t("Auth.haveAccount")}
          <Link href="/auth">{t("Auth.signin")}</Link>
        </span>

        <div className={styles.submitButton}>
          <Button
            type="primary"
            htmlType="submit"
            isLoading={isLoading}
            className="generalbtn"
            label={t("Auth.regist")}
          />
        </div>
      </Form>
      <Modal open={visible} onCancel={handleCancel} footer={null}>
        <div className="puzzle-captcha">
          <Verify
            width={window.innerWidth <= 400 ? 200 : 300}
            height={window.innerWidth <= 400 ? 90 : 150}
            visible={visible}
            onSuccess={handleVerify}
            onFail={() => message.warning(t("captcha.errorMessage"))}
            onRefresh={() => console.log("refresh")}
          />
        </div>
      </Modal>
    </div>
  );
};

export default RegisterWithPhone;
