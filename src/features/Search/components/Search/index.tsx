import React, { useEffect, useState } from "react";
import styles from "./Search.module.scss";
import SvgSelector from "$/assets/icons/SvgSelector";
import SearchBtn from "@/components/SearchBtn";
import { useTranslations } from "next-intl";
import Products from "@/components/Products";
import { Select, SelectOption } from "@/ui";
import { Form } from "antd";
import { useRouter } from "next/router";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { LoadingSpinner } from "@/ui/Spin";
import PageNoItems from "@/components/PageNoItems";
import useProductStore from "@/store/useProductStore";



const Search = () => {
  const t = useTranslations("Search");
  const router = useRouter();
  const { query, pathname, replace, locale } = router;
  const [activePlatform, setActivePlatform] = useState<any>("1688");
  const [form] = Form.useForm();

  const {
    products,
    hasMore,
    activeSort,
    setProducts,
    setHasMore,
    setActiveSort,
    isBack,
    setIsBack
  } = useProductStore();

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
    if (query.provider) {
      setActivePlatform(query.provider);
    }
  }, [query.provider]);

  useEffect(() => {
    if (query) {
      form.setFieldsValue(query);
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.value]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ((!isBack || !products.length) && (query.value || query.imageUrl)) {
        getSearchRes({
          ...query,
          lang: locale,
          page: 1,
        });
        setProducts([])
      } else {
        setIsBack(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, locale]);

  const handleGetProductWhenScrool = (customQuery: any) => {
    getMoreProducts({
      ...customQuery,
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
        setHasMore(res.products.length > 0);
      },
      onError(err) {
        setProducts([]);
        setHasMore(false);
      },
    });

  const { appendData: getMoreProducts, isLoading: isProductsLoading } =
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
      onError() {
        handleGetProductWhenScrool({ page: getRandomPageNumber() });
      },
    });

  const getRandomPageNumber = () => {
    return Math.floor(Math.random() * (50 - 10 + 1)) + 10;
  };

  return (
    <div className={styles.search}>
      <div className="container">
        <div className={styles.search__inner}>
          <div className={styles.search__media}>
            <div className={styles.search__platform}>
              <h2>{t("platform")}:</h2>
              <button
                className={`${styles.search__platform_btn} ${activePlatform === "taobao" ? styles.active : ""
                  }`}
                onClick={() => handleButtonClick("taobao")}
              >
                <SvgSelector id="taobao-svg" />
                <span>Taobao</span>
              </button>
              <button
                className={`${styles.search__platform_btn} ${activePlatform === "1688" ? styles.active : ""
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
                  className={activeSort === "" ? styles.active : ""}
                  onClick={() => handleFilter("")}
                >
                  {t("default")}
                </button>
                <button
                  className={
                    activeSort === "sale" ? styles.active : ""
                  }
                  onClick={() => handleFilter("sale")}
                >
                  {t("sales")}
                </button>
                <button
                  className={activeSort === "_bid" ? styles.active : ""}
                  onClick={() => handleFilter("_bid")}
                >
                  {t("price_down")}
                </button>
                <button
                  className={activeSort === "bid" ? styles.active : ""}
                  onClick={() => handleFilter("bid")}
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
                  <SelectOption value="TotalPrice:Asc">
                    {t("sales")}
                  </SelectOption>
                  <SelectOption value="Price:Asc">
                    {t("price_down")}
                  </SelectOption>
                  <SelectOption value="Price:Desc">
                    {t("price_top")}
                  </SelectOption>
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
              handleGetProduct={handleGetProductWhenScrool}
              scroolLoading={isProductsLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
