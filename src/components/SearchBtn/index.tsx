import React, { useEffect, useRef, useState } from "react";
import styles from "./Search.module.scss";
import { useRouter } from "next/router";
import { Button, Input, Modal } from "@/ui";
import SvgSelector from "$/assets/icons/SvgSelector";
import { Form } from "antd";
import { Upload } from 'antd';
import { UploadProps } from "antd/lib";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { json } from "stream/consumers";

const { Dragger } = Upload;

const SearchBtn = () => {
  const router = useRouter();
  const { value } = router.query;
  const [scrolled, setScrolled] = useState(false);
  const [startScrool, setStartScrool] = useState(false);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postData, setPostData] = useState();
  const draggerRef = useRef<any>(null);

  const handleSearch = (values: any) => {
    if (values.search) {
      const newQuery = {
        value: values.search,
        channel: router.query.channel || "taobao",
      };

      if (router.pathname === "/search") {
        router.replace(
          { pathname: router.pathname, query: newQuery },
          undefined,
          { shallow: true }
        );
      } else {
        // If not on the search page, navigate to the search page
        router.push({ pathname: "/search", query: newQuery });
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      form.submit();
    }
  };

  useEffect(() => {
    if (value) {
      form.setFieldValue("search", value);
    } else {
      form.resetFields();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

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

  const { appendData: postUploadData } = useQueryApiClient({
    request: {
      url: "image-search",
      method: "POST",
      multipart: true,
      responseType: "json",
    },
    onSuccess(res) {
      setPostData(res.url)
      router.push(`/search?imageUrl=${res.url}&lang=${router.locale}&channel=${router.query.channel || "taobao"}`);
    },
  });
  
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
    customRequest({ file, onSuccess, onError }) {
      const formData = new FormData();
      formData.append('image', file);

      postUploadData(formData);
      if (draggerRef.current) {
        draggerRef.current.reset();
      }
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        console.log(`${info.file.name} file uploaded successfully`);
        if (draggerRef.current) {
          draggerRef.current.reset();
        }
      } else if (info.file.status === 'error') {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
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
          </Dragger>
        </Modal>

      </div>
    </>
  );
};

export default SearchBtn;
