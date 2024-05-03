import * as React from 'react'
import { Radio as AntdRadio, Select as AntdSelect } from 'antd'

export interface RadioProps {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: any
  value?: string | number
  className?: string
  disabled?: boolean
  label?: string
  name?: string
}

const { Button } = AntdRadio

export const RadioButton = Button

export const Radio = ({
  disabled,
  label,
  defaultChecked,
  name,
  value,
  onChange,
  checked,
  className,
}: RadioProps) => {
  return (
    <AntdRadio
      disabled={disabled}
      defaultChecked={defaultChecked}
      name={name}
      value={value}
      onChange={onChange}
      checked={checked}
      className={className}
    >
      {label}
    </AntdRadio>
  )
}
