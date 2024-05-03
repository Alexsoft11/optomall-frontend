import React from "react";
import { Input as AntdInput } from "antd";
import { Rule } from "rc-field-form/lib/interface";
import FormItem from "antd/es/form/FormItem";

const { Password } = AntdInput;

export interface InputProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  type?: string;
  size?: "large" | "middle" | "small";
  value?: string;
  defaultValue?: string;
  maxLength?: number;
  allowClear?: boolean;
  label?: string;
  rules?: Rule[];
  className?: string;
  validateTrigger?: string | string[];
  noStyle?: boolean;
  initialValue?: string;
  disabled?: boolean;
  hasFeedback?: boolean;
  dependencies?: any[] | undefined;
  name?: (string | number)[] | string | number;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
}

export const Input = ({
  disabled = false,
  placeholder,
  name,
  required,
  prefix,
  suffix,
  type,
  onChange,
  size = "large",
  value,
  onBlur,
  maxLength = 255,
  allowClear,
  label,
  rules = [],
  className,
  validateTrigger,
  noStyle,
  initialValue,
  hasFeedback,
  dependencies,
  onKeyDown,
}: InputProps) => {
  // const intl = useIntl();
  // Custom validator function
  // const validateInput = (rule: Rule, value: string, callback: (error?: string) => void) => {
  //   if (/^\s+$/.test(value)) {
  //     callback(intl.formatMessage({ id: 'pleaseEnteraValidValue' }));
  //   } else {
  //     callback();
  //   }
  // };

  return (
    <FormItem
      initialValue={initialValue}
      label={label}
      name={name}
      rules={[
        ...rules,
        {
          // validator: validateInput,
        },
      ]}
      validateTrigger={validateTrigger}
      noStyle={noStyle}
      hasFeedback={hasFeedback}
      dependencies={dependencies}
    >
      {type === "password" ? (
        <Password
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          prefix={prefix}
          suffix={suffix}
          type={type}
          onChange={onChange}
          size={size}
          value={value}
          onBlur={onBlur}
          maxLength={maxLength}
          allowClear={allowClear}
          className={className}
        />
      ) : (
        <AntdInput
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          prefix={prefix}
          suffix={suffix}
          type={type}
          onChange={onChange}
          size={size}
          value={value}
          onBlur={onBlur}
          maxLength={maxLength}
          allowClear={allowClear}
          className={className}
          onKeyDown={onKeyDown}
        />
      )}
    </FormItem>
  );
};
