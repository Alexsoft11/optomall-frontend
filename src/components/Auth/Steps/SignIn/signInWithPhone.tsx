import { Form, InputRef } from "antd";
import React, { useRef } from "react";
import { validatePassword, validatePhoneNumber } from "../../Functions";
import styles from "./SignIn.module.scss";
import { MaskedInput } from "antd-mask-input";
import { Button, Input } from "@/ui";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FormInstance } from "antd/lib";

interface Props {
  form: FormInstance<any>;
  isLoading: boolean;
  createData: (data?: any, urlParams?: any, passOnSuccess?: any) => void;
}

const SignInWithPhone = ({ createData, form, isLoading }: Props) => {
  const inputRef = useRef<InputRef>(null);
  const t = useTranslations("");

  const onPhoneSignIn = (values: any) => {
    const number = `998 ${values?.phone_number}`;
    createData({
      email: number,
      password: values.password,
      type: "phone",
    });
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={(data) => onPhoneSignIn(data)}
        name="phoneSignIn"
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
          />
        </Form.Item>

        <Input
          name="password"
          rules={[
            { validator: (rule, value) => validatePassword(t, rule, value) },
          ]}
          type="password"
          placeholder={t("Auth.yourPassword")}
        />

        <span className={styles.forgot_Password}>
          <Link href="/auth?step=forgot-password">
            {t("Auth.forgotPassword")}
          </Link>
        </span>

        <div className={styles.submitButton}>
          <Button
            type="primary"
            htmlType="submit"
            isLoading={isLoading}
            className="generalbtn"
            label={t("Auth.signin")}
          />
        </div>
      </Form>
    </div>
  );
};

export default SignInWithPhone;
