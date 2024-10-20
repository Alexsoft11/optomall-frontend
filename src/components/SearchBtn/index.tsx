import React, { useEffect, useState } from "react";
import styles from "./Search.module.scss";
import { useRouter } from "next/router";
import { Button, Input, Modal } from "@/ui";
import SvgSelector from "$/assets/icons/SvgSelector";
import { Dropdown, Form, message } from "antd";
import { Upload } from "antd";
import { UploadProps } from "antd/lib";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useTranslations } from "next-intl";
import { LoadingSpinner } from "@/ui/Spin";
import useProductStore from "../../store/useProductStore";

const { Dragger } = Upload;
type ProviderInfo = {
  url?: string | null;
};

const SearchBtn = () => {
  const { query, locale, pathname, replace, push } = useRouter();
  const { value } = query;
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
  const [allItems, setAllItems] = useState<any[]>()

  const { setScrollPosition, categories } = useProductStore();

  const { appendData: getProductId, isLoading: isProductsLoading } =
    useQueryApiClient({
      request: {
        url: `extract-id`,
        method: "GET",
        disableOnMount: true,
      },
      onSuccess(res: any) {
        if (res.id) {
          push(`/product/${res.id}?provider=${res.provider}`);
        } else {
          message.error(t("noItems"));
        }
      },
      onError() {
        message.error(t("noItems"));
      },
    });

  const extractItems = (categories: any) => {
    let items: any[] = [];

    if (!Array.isArray(categories)) {
      console.error("categories is not an array or is undefined");
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

    categories?.forEach((category: any) => extract(category));

    return items;
  };

  useEffect(() => {
    if (categories) {
      const allItems = extractItems(categories);
      setAllItems(allItems)
    }

  }, [categories])


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();

    if (value) {
      const hintNamePairs = allItems?.flatMap((item) =>
        item.hints.map((hint: string) => ({
          id: item.id,
          name: item.name,
          hint: hint,
        }))
      );

      // Filter and sort based on hint
      const filteredPairs = hintNamePairs
        ?.filter((pair) => pair.hint.toLowerCase().includes(value))
        .sort(
          (a, b) =>
            a.hint.toLowerCase().indexOf(value) -
            b.hint.toLowerCase().indexOf(value)
        );

      // Create unique pairs based on id and name
      const uniquePairs = Array.from(
        new Set(filteredPairs?.map((pair) => pair.id))
      ).map((id) => filteredPairs?.find((pair) => pair.id === id));

      setFilteredItems(uniquePairs);
      setIsDropdownOpen(uniquePairs.length > 0);
    } else {
      setFilteredItems([]);
      setIsDropdownOpen(false);
    }
  };

  const urlPattern =
    /https?:\/\/(?:[^\s'"]+|\b(?:[a-zA-Z0-9-]+\.){1,3}[a-zA-Z]{2,})[^\s'"]*/;
  const extractUrl = (text: string): string | null => {
    const match = text.match(urlPattern);
    const res = match ? match[0] : null;
    return res || null;
  };

  // Main function to get provider info
  const getProviderInfo = (text: string): ProviderInfo => {
    const url = extractUrl(text);
    if (url) {
      getProductId({ url: url });
    }
    return { url };
  };

  // Modified handleSearch function
  const handleSearch = (values: any) => {
    if (values.search) {
      setScrollPosition(0)
      const { url } = getProviderInfo(values.search);
      setIsDropdownOpen(false);
      if (url) {
        return;
      }
      const newQuery: any = {
        value: values.search.toLowerCase(),
        provider: query.provider || "taobao",
      };

      if (values.catId) {
        newQuery.catId = values.catId;
      }

      if (pathname === "/search") {
        replace({ pathname: pathname, query: newQuery }, undefined, {
          shallow: true,
        });
      } else {
        push({ pathname: "/search", query: newQuery });
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
  }, [query, locale]);

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

  const { appendData: postUploadData, isLoading } = useQueryApiClient({
    request: {
      url: "image-search",
      method: "POST",
      multipart: true,
      responseType: "json",
    },
    onSuccess(res) {
      handleCancel();
      push(
        `/search?lang=${locale}&provider=${query.provider || "1688"}&imageUrl=${res.url
        }`
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

  const resizeImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      img.onload = () => {
        const maxWidth = 200;
        const maxHeight = 200;

        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height *= maxWidth / width;
            width = maxWidth;
          } else {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(resizedFile);
            } else {
              reject(new Error("Error resizing image"));
            }
          },
          file.type,
          1
        );
      };

      img.onerror = reject;

      img.src = URL.createObjectURL(file);
    });
  };

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  const uploadProps: UploadProps = {
    name: "file",
    multiple: true,
    beforeUpload: (file) => {
      const isValidType = allowedTypes.includes(file.type);
      if (!isValidType) {
        message.error(t("upload_validate"));
      }
      return isValidType || Upload.LIST_IGNORE;
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const resizedFile = await resizeImage(file as File);

        const formData = new FormData();
        formData.append("image", resizedFile);

        postUploadData(formData);
      } catch (error) {
        console.log("error");
      }
    },
    onChange(info: any) {
      setFileList(info.fileList);
      if (info.file.status === "done") {
        setFileList([]);
      }
    },
    fileList,
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target && !target.classList.contains("search_drop_item")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = filteredItems.map((hint, index) => ({
    key: hint.id,
    label: (
      <div
        className="search_drop_item"
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
                open={isMobile && startScrool ? isDropdownOpen : false}
              >
                <Input
                  type="text"
                  onKeyDown={handleKeyPress}
                  className={styles.search_input}
                  name={"search"}
                  placeholder={t("search_place")}
                  onChange={handleInputChange}
                  suffix={
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
                placeholder={t("search_place")}
                onChange={handleInputChange}
                suffix={
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
            accept="image/*"
            id="upload-input"
            className="antd-search-upload"
            maxCount={1}
          >
            <p className="ant-upload-drag-icon">
              <SvgSelector id="upload-svg" />
            </p>
            <p className="ant-upload-text">{t("upload_text")}</p>
          </Dragger>
          <p>{t("imageWarning")}</p>
        </Modal>
      </div>
      <LoadingSpinner fullscreen={true} spinning={isProductsLoading} />
    </>
  );
};

export default SearchBtn;
