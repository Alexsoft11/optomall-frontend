import React, { useEffect, useState } from "react";
import styles from "./Search.module.scss";
import { useRouter } from "next/router";
import { Button, Input } from "@/ui";
import SvgSelector from "$/assets/icons/SvgSelector";
import { Form } from "antd";

const SearchBtn = () => {
  const router = useRouter();
  const { value } = router.query;
  const [scrolled, setScrolled] = useState(false);
  const [startScrool, setStartScrool] = useState(false);
  const [form] = Form.useForm();

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
  useEffect(() => {
    if (window.innerWidth <= 850) {
      window.addEventListener("scroll", handleScroll);
    }
  });

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
              suffix={<SvgSelector id="search-svg" />}
            />
          </Form>
        </div>
      </div>

      <div className={styles.search}>
        <Form onFinish={handleSearch} form={form}>
          <Input
            type="text"
            onKeyDown={handleKeyPress}
            className={styles.search_input}
            name={"search"}
            suffix={<SvgSelector id="search-svg" />}
          />
        </Form>

        <Button
          className="generalbtn"
          shape="circle"
          iconId="photo-svg"
          iconPosition="left"
        />
      </div>
    </>
  );
};

export default SearchBtn;
