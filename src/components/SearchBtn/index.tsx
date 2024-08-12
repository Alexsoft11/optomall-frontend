import React, { useEffect, useRef, useState } from "react";
import styles from "./Search.module.scss";
import { useRouter } from "next/router";
import { Button, Input, Modal } from "@/ui";
import SvgSelector from "$/assets/icons/SvgSelector";
import { Form } from "antd";
import { Upload } from "antd";
import { UploadProps } from "antd/lib";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useTranslations } from "next-intl";
import { CategoryInterface } from "@/interfaces";

const { Dragger } = Upload;

interface Props {
  categoryData: CategoryInterface[];
}
const SearchBtn = ({ categoryData }: Props) => {
  const router = useRouter();
  const { value } = router.query;
  const [scrolled, setScrolled] = useState(false);
  const [startScrool, setStartScrool] = useState(false);
  const [form] = Form.useForm();
  const t = useTranslations("Search");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);

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

  const handleButtonSubmitClick = (e: any) => {
    form.submit();
  };

  useEffect(() => {
    if (value) {
      form.setFieldValue("search", value);
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query, router.locale]);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (location.pathname === "/" && offset >= 400) {
      setStartScrool(true);
    } else if (location.pathname !== "/" && offset > 280) {
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
      handleCancel();
      router.push(
        `/search?lang=${router.locale}&channel=${
          router.query.channel || "taobao"
        }&imageUrl=${res.url}`
      );
    },
    onError(err) {
      handleCancel();
    },
  });

  useEffect(() => {
    if (window.innerWidth <= 970) {
      window.addEventListener("scroll", handleScroll);
    }
  });

  const handleButtonClick = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFileList([]);
  };

  const uploadProps: UploadProps = {
    name: "file",
    multiple: true,
    customRequest({ file, onSuccess, onError }) {
      const formData = new FormData();
      formData.append("image", file);

      postUploadData(formData);
    },
    onChange(info: any) {
      setFileList(info.fileList);
      if (info.file.status === "done") {
        setFileList([]);
      }
    },
    fileList,
  };

  return (
    <>
      <div
        className={`${scrolled ? styles.sticky : ""}
            ${startScrool ? styles.sticky_start : ""}
            `}
      >
        <div className={styles.search_inner}>
          <div className={styles.search_stick}>
            <Form onFinish={handleSearch} form={form}>
              <Input
                type="text"
                onKeyDown={handleKeyPress}
                className={styles.search_input}
                name={"search"}
                suffix={
                  <div
                    className={styles.search_icon_btn}
                    onClick={handleButtonSubmitClick}
                  >
                    <SvgSelector id="search-svg" />
                  </div>
                }
              />
            </Form>
          </div>

          {scrolled && (
            <Button
              className="generalbtn"
              shape="circle"
              iconId="photo-svg"
              iconPosition="left"
              onClick={handleButtonClick}
            />
          )}
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
              prefix={
                <div
                  className={styles.search_icon_btn}
                  onClick={handleButtonSubmitClick}
                >
                  <SvgSelector id="search-svg" />
                </div>
              }
            />
          </Form>
        </div>

        <Button
          className="generalbtn"
          shape="circle"
          iconId="photo-svg"
          iconPosition="left"
          onClick={handleButtonClick}
        />

        <Modal
          title={t("upload_title")}
          open={isModalVisible}
          onCancel={handleCancel}
          className="upload_modal"
          footer={null}
        >
          <Dragger
            {...uploadProps}
            id="upload-input"
            className="antd-search-upload"
          >
            <p className="ant-upload-drag-icon">
              <SvgSelector id="upload-svg" />
            </p>
            <p className="ant-upload-text">{t("upload_text")}</p>
          </Dragger>
        </Modal>
      </div>
    </>
  );
};

export default SearchBtn;
