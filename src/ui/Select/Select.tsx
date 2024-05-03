import React from "react";
import { Form, Select as AntdSelect } from "antd";
import { Rule } from "rc-field-form/lib/interface";
import { CustomTagProps } from "rc-select/lib/BaseSelect";

export interface SelectProps {
  placeholder?: string;
  children?: React.ReactNode;
  defaultValue?: string | number | React.ReactText[];
  style?: React.CSSProperties;
  onChange?: any;
  size?: "large" | "middle" | "small";
  mode?: "multiple" | "tags";
  value?: number | string | string[];
  showSearch?: boolean;
  maxTagCount?: number | "responsive";
  allowClear?: boolean;
  loading?: boolean;
  optionLabelProp?: string;
  label?: string;
  name?: (string | number)[] | string | number;
  dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
  tagRender?: (props: CustomTagProps) => React.ReactElement;
  rules?: Rule[];
  initialValue?: string | string[] | number | number[];
  placement?: "bottomLeft" | "bottomRight" | "topLeft" | "topRight";
  noStyle?: boolean;
  disabled?: boolean;
  className?: string;
  formItemClassName?: string;
  variant?: "outlined" | "borderless" | "filled";
  labelInValue?: boolean;
}

const { Option } = AntdSelect;

export const SelectOption = Option;

export const Select = ({
  disabled,
  placeholder,
  className,
  children,
  onChange,
  defaultValue,
  style,
  size = "large",
  value,
  mode,
  showSearch = true,
  maxTagCount,
  allowClear,
  loading,
  optionLabelProp,
  label,
  name,
  dropdownRender,
  tagRender,
  rules,
  initialValue,
  placement,
  noStyle,
  variant,
  labelInValue,
  formItemClassName,
}: SelectProps) => {
  return (
    <Form.Item
      label={label}
      name={name}
      initialValue={initialValue}
      noStyle={noStyle}
      rules={rules}
      className={formItemClassName}
    >
      <AntdSelect
        disabled={disabled}
        placeholder={placeholder}
        className={className}
        getPopupContainer={(triggerNode: HTMLElement) => triggerNode}
        onChange={onChange}
        defaultValue={defaultValue}
        style={style}
        size={size}
        value={value}
        mode={mode}
        showSearch={showSearch}
        maxTagCount={maxTagCount}
        // suffixIcon={
        //   loading ? undefined : mode === 'multiple' && showSearch ? (
        //     <Icon faBase="fa-regular" icon="magnifying-glass" />
        //   ) : (
        //     <Icon faBase="far" icon="angle-down" />
        //   )
        // }
        // removeIcon={<Icon faBase="far" icon="times" />}
        // menuItemSelectedIcon={mode === 'multiple' ? <Icon faBase="fal" icon="check" /> : undefined}
        allowClear={allowClear}
        filterOption={(input: string, option: any) => {
          if (mode === "tags") {
            return true;
          }

          if (React.isValidElement(option.children?.[0])) {
            return (
              option.children[1].toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
          }
          return (
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          );
        }}
        loading={loading}
        optionLabelProp={optionLabelProp}
        dropdownRender={dropdownRender}
        tagRender={tagRender}
        placement={placement}
        variant={variant}
        labelInValue={labelInValue}
      >
        {children}
      </AntdSelect>
    </Form.Item>
  );
};
