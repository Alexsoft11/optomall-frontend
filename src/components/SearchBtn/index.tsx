import React, { use, useEffect, useRef, useState } from "react";
import styles from "./Search.module.scss";
import { useRouter } from "next/router";
import { Button, Input, Modal } from "@/ui";
import SvgSelector from "$/assets/icons/SvgSelector";
import { Dropdown, Form, Menu } from "antd";
import { Upload } from "antd";
import { UploadProps } from "antd/lib";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useTranslations } from "next-intl";
import { CategoryInterface } from "@/interfaces";

const { Dragger } = Upload;
type ProviderInfo = {
  id: string | null;
  provider: "taobao" | "1688" | null;
};

interface Props {
  categoryData?: CategoryInterface[];
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedCatId, setSelectedCatId] = useState<number | null>(null);

  const extractItems = (categoryData: any) => {
    let items: any[] = [];

    if (!Array.isArray(categoryData)) {
      console.error("categoryData is not an array or is undefined");
      return items;
    }

    const extract = (data: any) => {
      if (data.items && Array.isArray(data.items)) {
        items = items.concat(data.items);
      }
      if (data.subcategories && Array.isArray(data.subcategories)) {
        data.subcategories.forEach((subCategory: any) => extract(subCategory));
      }
    };

    categoryData.forEach((category: any) => extract(category));

    return items;
  };

  const allItems = extractItems(categoryData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();

    if (value) {
      const hintNamePairs = allItems.flatMap((item) =>
        item.hints.map((hint: string) => ({
          id: item.id,
          name: item.name,
          hint: hint,
        }))
      );

      // Filter and sort based on hint
      const filteredPairs = hintNamePairs
        .filter((pair) => pair.hint.toLowerCase().includes(value))
        .sort(
          (a, b) =>
            a.hint.toLowerCase().indexOf(value) -
            b.hint.toLowerCase().indexOf(value)
        );

      // Create unique pairs based on id and name
      const uniquePairs = Array.from(
        new Set(filteredPairs.map((pair) => pair.id))
      ).map((id) => filteredPairs.find((pair) => pair.id === id));

      setFilteredItems(uniquePairs);
      setIsDropdownOpen(uniquePairs.length > 0);
    } else {
      setFilteredItems([]);
      setIsDropdownOpen(false);
    }
  };

  const getProviderInfo = (url: string): ProviderInfo => {
    const taobaoPattern = /item\.taobao\.com\/item\.htm\?id=(\d+)/;
    const tmallPattern = /detail\.tmall\.com\/item\.htm\?id=(\d+)/;
    const alibabaPattern = /detail\.1688\.com\/offer\/(\d+)\.html/;
    const alibabaMobilePattern =
      /detail\.m\.1688\.com\/page\/index\.htm\?(?:.*&)?offerid=(\d+)/;

    let match = url.match(taobaoPattern);
    if (match) {
      return { id: match[1], provider: "taobao" };
    }

    match = url.match(tmallPattern);
    if (match) {
      return { id: match[1], provider: "taobao" };
    }

    match = url.match(alibabaPattern);
    if (match) {
      return { id: match[1], provider: "1688" };
    }

    match = url.match(alibabaMobilePattern);
    if (match) {
      return { id: match[1], provider: "1688" };
    }

    return { id: null, provider: null };
  };

  // Modified handleSearch function
  const handleSearch = (values: any) => {
    if (values.search) {
      const providerInfo = getProviderInfo(values.search);
      let firstHint; // = filteredItems[0];
      setIsDropdownOpen(false);

      // If a valid Taobao or 1688 link is detected
      if (providerInfo.id && providerInfo.provider) {
        // Navigate to the product page with the ID and provider
        router.push(
          `/product/${providerInfo.id}?provider=${providerInfo.provider}`
        );
      } else {
        // Proceed with the existing search logic
        const newQuery: any = {
          value: values.search.toLowerCase(),
          provider: router.query.provider || "1688",
        };

        if (values.catId) {
          newQuery.catId = values.catId;
        }

        if (router.pathname === "/search") {
          router.replace(
            { pathname: router.pathname, query: newQuery },
            undefined,
            { shallow: true }
          );
        } else {
          router.push({ pathname: "/search", query: newQuery });
        }
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
    } else if (location.pathname !== "/" && offset > 350) {
      setStartScrool(true);
    } else {
      setStartScrool(false);
      setIsDropdownOpen(false);
    }

    if (location.pathname === "/" && offset > 600) {
      setScrolled(true);
    } else if (location.pathname !== "/" && offset > 350) {
      setScrolled(true);
    } else {
      setScrolled(false);
      setIsDropdownOpen(false);
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
        `/search?lang=${router.locale}&provider=${
          router.query.provider || "1688"
        }&imageUrl=${res.url}`
      );
    },
    onError(err) {
      handleCancel();
    },
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

  const menuItems = filteredItems.map((hint, index) => ({
    key: hint.id,
    label: (
      <div
        onClick={() => {
          setSelectedCatId(hint.id);
          handleSearch({ search: hint.name, catId: hint.id });
          setIsDropdownOpen(false);
        }}
      >
        {hint.name}
      </div>
    ),
  }));

  useEffect(() => {
    if (window.innerWidth <= 970) {
      window.addEventListener("scroll", handleScroll);
    }
    setIsMobile(window.innerWidth <= 768);
  }, []);

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
              <Dropdown
                menu={{ items: menuItems }}
                open={isMobile ? isDropdownOpen : false}
              >
                <Input
                  type="text"
                  onKeyDown={handleKeyPress}
                  className={styles.search_input}
                  name={"search"}
                  onChange={handleInputChange}
                  prefix={
                    <div
                      className={styles.search_icon_btn}
                      onClick={handleButtonSubmitClick}
                    >
                      <SvgSelector id="search-svg" />
                    </div>
                  }
                />
              </Dropdown>
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
            <Dropdown menu={{ items: menuItems }} open={isDropdownOpen}>
              <Input
                type="text"
                onKeyDown={handleKeyPress}
                className={styles.search_input}
                name={"search"}
                onChange={handleInputChange}
                prefix={
                  <div
                    className={styles.search_icon_btn}
                    onClick={handleButtonSubmitClick}
                  >
                    <SvgSelector id="search-svg" />
                  </div>
                }
              />
            </Dropdown>
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
