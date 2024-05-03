import React from "react";
import { Form, Upload as AntdUpload, message } from "antd";
import { Rule } from "rc-field-form/lib/interface";
import { InboxOutlined } from "@ant-design/icons";
import { Button } from "..";

interface UploadProps {
  onChange?: any;
  name?: (string | number)[] | string | number;
  label?: string;
  rules?: Rule[];
  className?: string;
  initialValue?: string;
  btnLabel?: string;
  children?: React.ReactNode;
  beforeUpload?: (file: File, fileList: File[]) => boolean | Promise<void>;
}

export const Upload = ({
  name,
  label,
  rules,
  className,
  initialValue,
  onChange,
  btnLabel,
  children,
  beforeUpload,
}: UploadProps) => {
  const customRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleChange = (info: any) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      if (onChange) {
        onChange(info);
      }
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      initialValue={initialValue}
    >
      <AntdUpload
        customRequest={customRequest}
        onChange={onChange}
        showUploadList={false}
        beforeUpload={beforeUpload}
        fileList={[]}
      >
        {children ? (
          children
        ) : (
          <Button
            icon={<InboxOutlined />}
            className={className}
            label={btnLabel}
          />
        )}
      </AntdUpload>
    </Form.Item>
  );
};
