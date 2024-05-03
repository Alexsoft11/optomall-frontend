import React from "react";
import { Form, DatePicker as AntdDatePicker } from "antd";
import { Rule } from "rc-field-form/lib/interface";
import dayjs from "dayjs";

export interface DatePickerProps {
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
  name?: (string | number)[] | string | number;
  className?: string;
  validateTrigger?: string | string[];
  noStyle?: boolean;
  initialValue?: string;
  disabled?: boolean;
  format?: string;
  disabledDate?: any;
}

export const DatePicker = ({
  disabled = false,
  placeholder,
  name,
  size = "large",
  value,
  onBlur,
  maxLength = 255,
  allowClear,
  label,
  rules,
  className,
  validateTrigger,
  noStyle,
  initialValue,
  format,
  disabledDate,
}: DatePickerProps) => {
  return (
    <Form.Item
      initialValue={initialValue}
      label={label}
      name={name}
      rules={rules}
      className={className}
      validateTrigger={validateTrigger}
      noStyle={noStyle}
    >
      <AntdDatePicker
        disabled={disabled}
        placeholder={placeholder}
        size={size}
        value={value ? dayjs(value) : null}
        // onBlur={onBlur}
        allowClear={allowClear}
        format={format}
        disabledDate={disabledDate}
      />
    </Form.Item>
  );
};
