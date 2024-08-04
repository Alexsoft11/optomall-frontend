import React, { useEffect, useState } from "react";
import styles from "./Search.module.scss";
import { useRouter } from "next/router";
import { Button, Input, Modal } from "@/ui";
import SvgSelector from "$/assets/icons/SvgSelector";
import { Form } from "antd";
import { Upload } from 'antd';
import { UploadProps } from "antd/lib";
import useQueryApiClient from "@/utils/useQueryApiClient";

const { Dragger } = Upload;

const SearchBtn = () => {
  const router = useRouter();
  const { query } = router.query;
  const [scrolled, setScrolled] = useState(false);
  const [startScrool, setStartScrool] = useState(false);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearch = (values: any) => {
    if (values.search) {
      router.push(`/search?query=${values.search}&channel=${router.query.channel || 'taobao'}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      form.submit();
    }
  };

  useEffect(() => {
    if (query) {
      form.setFieldValue("search", query);
    } else {
      form.resetFields();
    }
  }, [query]);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset >= 400) {
      setStartScrool(true);
    } else {
      setStartScrool(false);
    }

    if (location.pathname === "/" && offset > 600) {
      setScrolled(true);
    } else if (location.pathname !== "/" && offset > 280) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  
  useEffect(() => {
    if (window.innerWidth <= 850) {
      window.addEventListener("scroll", handleScroll);
    }
  });

  const handleButtonClick = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    action: '/upload', // Replace with your upload URL
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        console.log(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleUploadButtonClick = () => {
    document.getElementById('upload-input')?.click();
  };

  return (
    <>
      <div
        className={`${scrolled ? styles.sticky : ""}
            ${startScrool ? styles.sticky_start : ""}
            `}
      >
        <div className={styles.search_stick}>
          <Form onFinish={handleSearch} form={form}>
            <Input
              type="text"
              onKeyDown={handleKeyPress}
              className={styles.search_input}
              name={"search"}
              prefix={<SvgSelector id="search-svg" />}
            />
          </Form>
        </div>
      </div>


      <div className={styles.search_inner}>
        <div className={styles.search}>
          <Form onFinish={handleSearch} form={form}>
            <Input
              type="text"
              onKeyDown={handleKeyPress}
              className={styles.search_input}
              name={"search"}
              prefix={<SvgSelector id="search-svg" />}
            />
          </Form>
        </div>

        <Button
          className='generalbtn'
          shape='circle'
          iconId='photo-svg'
          iconPosition='left'
          onClick={handleButtonClick}
        />

        <Modal
          title="Your Modal Title"
          open={isModalVisible}
          onCancel={handleCancel}
          className="upload_modal"
          footer={null}
        >
          <Dragger {...uploadProps} id="upload-input">
            <p className="ant-upload-drag-icon">
              <SvgSelector id="upload-svg"/>
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from uploading company data or other
              banned files.
            </p>
          </Dragger>
          <div className={styles.uploadbtn}>
            <Button
              className="generalbtn"
              label="upload"
              onClick={handleUploadButtonClick}
            />
          </div>
        </Modal>

      </div>
    </>
  );
};

export default SearchBtn;
