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
import { Button, Modal, Input, message } from "antd";
import { LikeOutlined, DislikeOutlined, CommentOutlined } from "@ant-design/icons";
import axios from "axios";

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
    appendProducts
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
    if (!router.isReady) return;

    if (typeof window !== "undefined") {
      // If we are coming back and have content, just restore state (don't fetch)
      if (isBack && products.length > 0) {
        setIsBack(false);
        return;
      }

      // Normal fetch if we have query params
      if (query.ai_id) {
        // AI Search handled by separate effect or here
        // We will handle it below to avoid conflict
      } else if (query.value || query.imageUrl) {
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
  }, [query, locale, router.isReady]);

  const [aiPage, setAiPage] = useState(1);
  const aiPageRef = React.useRef(1);

  const handleGetProductWhenScrool = (customQuery: any) => {
    if (query.ai_id) {
      const nextPage = aiPageRef.current + 1;
      aiPageRef.current = nextPage;
      setAiPage(nextPage);
      getAiSearchRes({ id: query.ai_id, page: nextPage });
    } else {
      getMoreProducts({
        ...customQuery,
        ...query,
        lang: locale,
        sort: query.provider === "1688" ? query.sort : "",
      });
    }
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
        // Retry logic? For now removed random retry to prevent recursion loops
        setHasMore(false);
      },
    });

  const { appendData: getAiSearchRes, isLoading: isAiLoading } = useQueryApiClient({
    request: {
      url: `/ai/search`,
      method: "POST",
      disableOnMount: true,
    },
    onSuccess(res: any) {
      if (aiPageRef.current === 1) {
        setProducts(res.data);
      } else {
        appendProducts(res.data);
      }
      setHasMore(res.data.length > 0);
    },
  });

  const tAi = useTranslations("Ai");

  useEffect(() => {
    if (query.ai_id && router.isReady) {
      // Complete reset for new AI Search
      setProducts([]); // Clear old data immediately to show loading
      setHasMore(true);
      aiPageRef.current = 1;
      setAiPage(1);
      getAiSearchRes({ id: query.ai_id, page: 1 });
    }
  }, [query.ai_id, router.isReady]);

  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const { appendData: submitFeedback } = useQueryApiClient({
    request: {
      url: '/ai/feedback',
      method: 'POST',
      disableOnMount: true,
    },
    onSuccess: () => {
      // handled locally
    },
    onError: () => {
      message.error(tAi("error"));
    }
  });

  const handleFeedback = (like: boolean) => {
    submitFeedback(
      { id: query.ai_id, like },
      undefined,
      null
    );
    message.success(tAi("feedback_thanks"));
  };

  const submitComment = () => {
    submitFeedback(
      { id: query.ai_id, comment: commentText },
      undefined,
      null
    );
    message.success(tAi("comment_sent"));
    setCommentModalOpen(false);
  };

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


          {query.ai_id && (
            <div className={styles.search__aiBanner}>
              <div>
                <h3>{tAi("banner_title")}</h3>
                <p>{tAi("banner_subtitle")}</p>
              </div>
              <div className={styles.search__aiBanner_actions}>
                <Button icon={<LikeOutlined />} onClick={() => handleFeedback(true)}>{tAi("good")}</Button>
                <Button icon={<DislikeOutlined />} onClick={() => handleFeedback(false)}>{tAi("bad")}</Button>
                <Button icon={<CommentOutlined />} onClick={() => setCommentModalOpen(true)}>{tAi("comment")}</Button>
              </div>
            </div>
          )}

          {isSearchResLoading || (isAiLoading && products.length === 0) ? (
            <LoadingSpinner
              size="large"
              fullscreen={true}
              spinning={isSearchResLoading || (isAiLoading && products.length === 0)}
            />
          ) : !products?.length && !isSearchResLoading && !isAiLoading ? (
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
              scroolLoading={isProductsLoading || isAiLoading}
            />
          )}
        </div>
      </div>

      <Modal title={tAi("modal_comment_title")} open={commentModalOpen} onCancel={() => setCommentModalOpen(false)} onOk={submitComment}>
        <Input.TextArea rows={4} value={commentText} onChange={e => setCommentText(e.target.value)} placeholder={tAi("comment_placeholder")} />
      </Modal>
    </div>
  );
};

export default Search;
