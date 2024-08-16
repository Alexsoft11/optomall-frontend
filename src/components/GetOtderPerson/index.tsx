import React, { use, useEffect, useRef } from "react";
import styles from "./GetOtderPerson.module.scss";
import { useTranslations } from "next-intl";
import { Form, InputRef } from "antd";
import { validateName, validatePhone } from "@/components/Auth/Functions";
import { Input } from "@/ui";
import { MaskedInput } from "antd-mask-input";
import { PersonalDataInterface } from "@/features/Order/interfaces";

interface Props {
  setPersonData: any;
  personData: PersonalDataInterface;
}

export default function GetOrderPerson({ setPersonData, personData }: Props) {
  const t = useTranslations("");
  const [form] = Form.useForm();
  const inputRef = useRef<InputRef>(null);

  const onFinifh = () => {
    const data = form.getFieldsValue();
    data.phone = `+998${inputRef.current?.input?.value.match(/\d/g)?.join("")}`;
    setPersonData(data);
  };

  useEffect(() => {
    personData
    personData.name ? form.setFieldValue("name", personData.name) : null;
    personData.phone ? form.setFieldValue("phone", personData.phone) : null;
  }, [personData]);

  return (
    <div className={styles.main}>
      <h2>{t("Cart.person")}</h2>
      <div className={styles.form_block}>
        <Form
          onFinish={onFinifh}
          form={form}
          name="horizontal_login"
          layout="inline"
        >
          <Input
            name="name"
            rules={[
              {
                validator: (rule, value) =>
                  validateName(t("Auth.lastNameValidateError"), rule, value),
              },
            ]}
            onBlur={() => form.submit()}
            type="text"
            placeholder={t("name")}
          />

          <Form.Item
            name="phone"
            rules={[{ validator: (rule, value) => validatePhone(t, value) }]}
            required
          >
            <MaskedInput
              value={personData.phone}
              className={styles.maskedInput}
              ref={inputRef}
              onBlur={() => form.submit()}
              type="text"
              prefix={"+998"}
              mask={"(00) 000-00-00"}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
