import React from 'react';
import { Form, Checkbox as AntdCheckbox } from 'antd';
import { Rule } from 'rc-field-form/lib/interface';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { StyledChackbox } from './style';

export interface CheckboxProps {
  onChange?: ((e: CheckboxChangeEvent) => void) | undefined;
  onBlur?: ((event: React.FocusEvent<HTMLInputElement>) => void) | undefined;
  label?: string;
  name?: (string | number)[] | string | number;
  className?: string;
  rules?: Rule[];
  noStyle?: boolean;
  initialValue?: boolean;
  disabled?: boolean;
  checked?: boolean | undefined;
}

export const Checkbox = ({
  disabled = false,
  label,
  name,
  onChange,
  onBlur,
  rules,
  className,
  noStyle,
  initialValue,
  checked,
}: CheckboxProps) => {
  return (
    <Form.Item name={name} rules={rules} className={className} noStyle={noStyle} initialValue={initialValue}>
      <StyledChackbox disabled={disabled} onChange={onChange} checked={checked}>
        {label}
      </StyledChackbox>
    </Form.Item>
  );
};
