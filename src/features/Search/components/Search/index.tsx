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
    setIsBack,
  } = useProductStore();

  const handleButtonClick = (platform: any) => {
    const newQuery: any = {
      ...query,
      provider: platform || "1688",
    };

    delete newQuery?.sort;
    replace({ pathname: pathname, query: newQuery }, undefined, {
      shallow: true,
    });
    setActivePlatform(platform);
  };

  const handleFilter = (sortIndex: number) => {
    const selectedSort = sort[sortIndex];
    const sortKey =
      activePlatform === "1688" ? selectedSort.tmKey : selectedSort.onboundKey;
    const newQuery = { ...query };

    setActiveSort(sortKey || "");

    if (sortKey) {
      newQuery.sort = sortKey;
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
          imageUrl:
            query.provider === "1688" ? query.imageUrl : query.secondImage,
          page: 1,
          sort: query.provider === "1688" ? query.sort : "",
        });
        setProducts([]);
      } else {
        setIsBack(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, locale]);

  const handleGetProductWhenScrool = (customQuery: any) => {
    getMoreProducts({
      ...customQuery,
      ...query,
      lang: locale,
      sort: query.provider === "1688" ? query.sort : "",
    });
  };

  const { appendData: getSearchRes, isLoading: isSearchResLoading } =
    useQueryApiClient({
      request: {
        url: `search-products-from-tmapi`,
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
        url: `search-products-from-tmapi`,
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

  const sort = [
    { id: 1, name: "default", tmKey: undefined, onboundKey: undefined },
    { id: 2, name: "sales", tmKey: "sales", onboundKey: "sale" },
    { id: 3, name: "price_down", tmKey: "price_up", onboundKey: "_bid" },
    { id: 4, name: "price_top", tmKey: "price_down", onboundKey: "bid" },
  ];

  return (
    <div className={styles.search}>
      <div className="container">
        <div className={styles.search__inner}>
          <div className={styles.search__media}>
            <div className={styles.search__platform}>
              <h2>{t("platform")}:</h2>
              {/* <button
                className={`${styles.search__platform_btn} ${
                  activePlatform === "taobao" ? styles.active : ""
                }`}
                onClick={() => handleButtonClick("taobao")}
              >
                <SvgSelector id="taobao-svg" />
                <span>Taobao</span>
              </button> */}
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
                {sort.map((item, index) => (
                  <button
                    key={item.id}
                    className={
                      query.sort === item.tmKey ||
                      query.sort === item.onboundKey
                        ? styles.active
                        : ""
                    }
                    onClick={() => handleFilter(index)}
                  >
                    {t(item.name)}
                  </button>
                ))}
                <Select
                  defaultValue={0}
                  onChange={(value: any) => handleFilter(value)}
                  className={`${styles.search__select} search_select`}
                  showSearch={false}
                >
                  {sort.map((item, index) => (
                    <SelectOption key={item.id} value={index}>
                      {t(item.name)}
                    </SelectOption>
                  ))}
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
            <PageNoItems
              title={t("refresh_error_text")}
              text={t("refresh_page")}
              customBtnFunc={() => window.location.reload()}
            />
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
