import React, { useEffect, useState } from "react";
import styles from "./Search.module.scss";
import SvgSelector from "$/assets/icons/SvgSelector";
import SearchBtn from "@/components/SearchBtn";
import { useTranslations } from "next-intl";
import Products from "@/components/Products";
import { Button, Input } from "@/ui";
import { Form } from "antd";
import { useRouter } from "next/router";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { useJwt } from "@/utils/useJwt";
import { LoadingSpinner } from "@/ui/Spin";
import PageNoItems from "@/components/PageNoItems";

interface Props {
  data?: any;
}

const Search = ({ data = [] }: Props) => {
  const t = useTranslations("Search");
  const router = useRouter();
  const [activePlatform, setActivePlatform] = useState(router.query.provider);
  const [form] = Form.useForm();
  const token = useJwt();
  const [products, setProducts] = useState(data);
  const [hasMore, setHasMore] = useState(true);
  const handleButtonClick = (platform: any) => {
    const newQuery = {
      ...router.query,
      provider: platform || "taobao",
    };
    router.replace({ pathname: router.pathname, query: newQuery }, undefined, {
      shallow: true,
    });
    setActivePlatform(platform);
  };

  const handleFilter = (values: any) => {
    let { startPrice, endPrice } = values;

    if (startPrice > endPrice) {
      [startPrice, endPrice] = [endPrice, startPrice];
      form.setFieldsValue({ startPrice, endPrice });
    }
    const newQuery = {
      ...router.query,
      startPrice: startPrice,
      endPrice: endPrice,
    };
    router.replace({ pathname: router.pathname, query: newQuery }, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    if (router.query) {
      form.setFieldsValue(router.query);
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.value]);

  useEffect(() => {
    if (router.query) {
      getSearchRes({
        ...router.query,
        provider: router.query.provider,
        lang: router.locale,
        provider: null,
        page: 2,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query, router.locale]);

  const handleGetProduct = (query?: any) => {
    getProducts({
      ...router.query,
      ...query,
      provider: router.query.provider,
      lang: router.locale,
    });
  };

  const validateNoSigns = (_: any, value: string) => {
    if (value && (value.includes("+") || value.includes("-"))) {
      return Promise.reject(new Error(t("invalid_value")));
    }
    return Promise.resolve();
  };

  const { appendData: getSearchRes, isLoading: isSearchResLoading } =
    useQueryApiClient({
      request: {
        url: `search-products-from-taobao`,
        method: "GET",
        disableOnMount: true,
      },
      onSuccess(res: any) {
        setProducts(res.products);
      },
    });

  const { appendData: getProducts, isLoading: isProductsLoading } =
    useQueryApiClient({
      request: {
        url: `search-products-from-taobao`,
        method: "GET",
        disableOnMount: true,
      },
      onSuccess(res: any) {
        if (!res.products.length) {
          setHasMore(false);
          return;
        }
        const newProducts = [...products, ...res.products];
        setProducts(newProducts);
      },
    });

  return (
    <>
      <div className={styles.search}>
        <div className="container">
          <div className={styles.search__inner}>
            <div className={styles.search__media}>
              <div className={styles.search__platform}>
                <h2>{t("platform")}:</h2>
                <button
                  className={`${styles.search__platform_btn} ${
                    activePlatform === "taobao" ? styles.active : ""
                  }`}
                  onClick={() => handleButtonClick("taobao")}
                >
                  <SvgSelector id="taobao-svg" />
                  <span>Taobao</span>
                </button>
                <button
                  className={`${styles.search__platform_btn} ${
                    activePlatform === "1688" ? styles.active : ""
                  }`}
                  onClick={() => handleButtonClick("1688")}
                >
                  <SvgSelector id="1688-svg" />
                  <span>1688</span>
                </button>
              </div>

              <div className={styles.search__btn}>
                <SearchBtn />
              </div>

              <div className={styles.search__top}>
                <div className={styles.search__inputs}>
                  <Form onFinish={handleFilter} form={form}>
                    <Input
                      type="number"
                      className={styles.search__input}
                      name={"startPrice"}
                      placeholder="min price"
                      rules={[{ validator: validateNoSigns }]}
                      suffix={<SvgSelector id="sorting-svg" />}
                    />
                    <Input
                      type="number"
                      className={styles.search__input}
                      name={"endPrice"}
                      placeholder="max price"
                      rules={[{ validator: validateNoSigns }]}
                      suffix={<SvgSelector id="sorting-svg" />}
                    />
                    <Button
                      htmlType="submit"
                      className="generalbtn"
                      label={t("submit")}
                    />
                  </Form>
                </div>
              </div>
            </div>

            {isSearchResLoading ? (
              <LoadingSpinner
                size="large"
                fullscreen={true}
                spinning={isSearchResLoading}
              />
            ) : !products.length && !isSearchResLoading ? (
              <PageNoItems title={t("noItems")} />
            ) : (
              <Products
                type="scroll"
                data={products}
                hasMore={hasMore}
                handleGetProduct={handleGetProduct}
              />
            )}
            <LoadingSpinner size="large" spinning={isProductsLoading} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
