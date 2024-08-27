import React, { useEffect, useState } from "react";
import styles from "./Search.module.scss";
import SvgSelector from "$/assets/icons/SvgSelector";
import SearchBtn from "@/components/SearchBtn";
import { useTranslations } from "next-intl";
import Products from "@/components/Products";
import { Button, Input, Select, SelectOption } from "@/ui";
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
  const { query, pathname, replace, locale } = useRouter();
  const [activePlatform, setActivePlatform] = useState(query.provider);
  const [form] = Form.useForm();
  const token = useJwt();
  const [products, setProducts] = useState(data);
  const [hasMore, setHasMore] = useState(true);
  const [activeSort, setActiveSort] = useState<string>("Default");

  const handleButtonClick = (platform: any) => {
    const newQuery = {
      ...query,
      provider: platform || "1688",
    };
    replace({ pathname: pathname, query: newQuery }, undefined, {
      shallow: true,
    });
    setActivePlatform(platform);
  };

  const handleFilter = (sortType: string) => {
    const newQuery = { ...query };
    setActiveSort(sortType);

    if (sortType) {
      newQuery.sort = sortType;
    } else {
      delete newQuery.sort;
    }

    replace({ pathname: pathname, query: newQuery }, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    if (query) {
      form.setFieldsValue(query);
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.value]);

  useEffect(() => {
    if (query) {
      getSearchRes({
        ...query,
        lang: locale,
        page: 1,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, locale]);

  const handleGetProduct = (custom?: any) => {
    getProducts({
      ...custom,
      ...query,
      lang: locale,
    });
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
      onError(err) {
        setProducts([]);
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

  const { appendData: getCategoryData, data: categoryData } = useQueryApiClient(
    {
      request: {
        url: `categories-from-taobao?lang=${locale}`,
        method: "GET",
        disableOnMount: true
      },
    }
  );

  useEffect(() => {
    if (window.innerWidth <= 768) {
      getCategoryData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  return (
    <>
      <div className={styles.search}>
        <div className="container">
          <div className={styles.search__inner}>
            <div className={styles.search__media}>
              <div className={styles.search__platform}>
                <h2>{t("platform")}:</h2>
                <button
                  className={`${styles.search__platform_btn} ${activePlatform === "1688" ? styles.active : ""
                    }`}
                  onClick={() => handleButtonClick("1688")}
                >
                  <SvgSelector id="1688-svg" />
                  <span>1688</span>
                </button>
                {/* <button
                  className={`${styles.search__platform_btn} ${
                    activePlatform === "taobao" ? styles.active : ""
                  }`}
                  onClick={() => handleButtonClick("taobao")}
                >
                  <SvgSelector id="taobao-svg" />
                  <span>Taobao</span>
                </button> */}
              </div>

              <div className={styles.search__btn}>
                <SearchBtn categoryData={categoryData.categories} />
              </div>

              <div className={styles.search__top}>
                <div className={styles.search__btns}>
                  <button
                    className={activeSort === "Default" ? styles.active : ""}
                    onClick={() => handleFilter("Default")}
                  >
                    {t("default")}
                  </button>
                  <button
                    className={activeSort === "TotalPrice:Asc" ? styles.active : ""}
                    onClick={() => handleFilter("TotalPrice:Asc")}
                  >
                    {t("sales")}
                  </button>
                  <button
                    className={activeSort === "Price:Asc" ? styles.active : ""}
                    onClick={() => handleFilter("Price:Asc")}
                  >
                    {t("price_down")}
                  </button>
                  <button
                    className={activeSort === "Price:Desc" ? styles.active : ""}
                    onClick={() => handleFilter("Price:Desc")}
                  >
                    {t("price_top")}
                  </button>
                  <Select
                    value={activeSort}
                    onChange={(value: any) => handleFilter(value)}
                    className={`${styles.search__select} search_select`}
                    showSearch={false}
                  >
                    <SelectOption value="Default">{t("default")}</SelectOption>
                    <SelectOption value="TotalPrice:Asc">{t("sales")}</SelectOption>
                    <SelectOption value="Price:Asc">{t("price_down")}</SelectOption>
                    <SelectOption value="Price:Desc">{t("price_top")}</SelectOption>
                  </Select>
                </div>
              </div>
            </div>

            {isSearchResLoading ? (
              <LoadingSpinner
                size="large"
                fullscreen={true}
                spinning={isSearchResLoading}
              />
            ) : !products?.length && !isSearchResLoading ? (
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
