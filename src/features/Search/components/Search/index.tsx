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

  const handleFilter = (sortType: string) => {
    const newQuery = { ...router.query };
  
    if (sortType) {
      newQuery.sort = sortType;
    } else {
      delete newQuery.sort;
    }
  
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
  
        lang: router.locale,
        page: 2,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query, router.locale]);

  const handleGetProduct = (query?: any) => {
    getProducts({
      ...router.query,
      ...query,
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
                <div className={styles.search__btns}>
                  <button
                    onClick={() => handleFilter("")}
                  >
                    {t("default")}
                  </button>
                  <button
                    onClick={() => handleFilter("_sale")}
                  >
                    {t("sales")}
                  </button>
                  <button
                    onClick={() => handleFilter("_credit")}
                  >
                    {t("reputation")}
                  </button>
                  <button
                    onClick={() => handleFilter("_bid2")}
                  >
                    {t("price_down")}
                  </button>
                  <button
                    onClick={() => handleFilter("bid2")}
                  >
                    {t("price_top")}
                  </button>
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
