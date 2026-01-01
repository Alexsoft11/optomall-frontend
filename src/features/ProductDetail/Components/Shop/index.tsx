/** @format */

import { Button, Progress, Empty, Pagination, Tag, Select } from "antd";
import React, { FC, useEffect, useState, useRef } from "react";
import styles from "./Shop.module.scss";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { LoadingSpinner } from "@/ui/Spin";
import SvgSelector from "$/assets/icons/SvgSelector";
import Card from "@/components/Card";
import { CardInterface } from "@/interfaces";

interface ShopRating {
  title: string;
  type: string;
  score: string;
}

interface ShopInfo {
  member_id: string;
  seller_id: string | null;
  company_id: string | null;
  company_name: string;
  shop_name: string;
  shop_url: string;
  shop_logo: string;
  chat_url: string;
  location_str: string;
  location: {
    province: string;
    city: string;
    street: string;
  };
  is_industry_brand: boolean;
  is_factory: boolean;
  is_super_factory: boolean;
  is_flagship_shop: boolean;
  is_tp: boolean;
  tp_year: string;
  favorite_count: string;
  shop_ratings: ShopRating[];
  contact_info: {
    mobile: string;
    contact_name: string;
    job_title: string | null;
  };
}

interface Props {
  sellerId?: string;
  autoLoadProducts?: boolean;
}

const SORT_OPTIONS = [
  { value: "default", labelKey: "sort_default" },
  { value: "sales", labelKey: "sort_sales" },
  { value: "price_up", labelKey: "sort_price_up" },
  { value: "price_down", labelKey: "sort_price_down" },
  { value: "time_up", labelKey: "sort_time_new" },
  { value: "time_down", labelKey: "sort_time_old" },
];

const Shop: FC<Props> = ({ sellerId, autoLoadProducts = false }) => {
  const t = useTranslations("Product-detail");
  const { locale } = useRouter();
  const [showProducts, setShowProducts] = useState(autoLoadProducts);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("default");
  const [shopInfo, setShopInfo] = useState<ShopInfo | null>(null);
  const [shopProducts, setShopProducts] = useState<CardInterface[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const pageSize = 20;
  const productsSectionRef = useRef<HTMLDivElement>(null);

  // Fetch shop information
  const {
    data: shopInfoData,
    isLoading: isShopInfoLoading,
    appendData: fetchShopInfo,
  } = useQueryApiClient({
    request: {
      url: `shop-information`,
      method: "GET",
      disableOnMount: true,
    },
  });

  // Fetch shop products
  const {
    data: shopProductsData,
    isLoading: isProductsLoading,
    appendData: fetchShopProducts,
  } = useQueryApiClient({
    request: {
      url: `shop-products`,
      method: "GET",
      disableOnMount: true,
    },
  });

  // Effect to fetch shop info when sellerId changes
  useEffect(() => {
    if (sellerId) {
      fetchShopInfo({ member_id: sellerId, lang: locale });
    }
  }, [sellerId]);

  useEffect(() => {
    if (autoLoadProducts && sellerId) {
      handleShowProducts();
    }
  }, [sellerId, autoLoadProducts]);

  // Effect to handle shop info response
  useEffect(() => {
    if (shopInfoData && shopInfoData.data) {
      setShopInfo(shopInfoData.data);
    }
  }, [shopInfoData]);

  // Effect to handle shop products response
  useEffect(() => {
    if (shopProductsData && shopProductsData.data) {
      setShopProducts(shopProductsData.data.items || []);
      setTotalProducts(shopProductsData.data.total || 0);
    }
  }, [shopProductsData]);

  const handleShowProducts = () => {
    setShowProducts(true);
    if (sellerId) {
      fetchShopProducts({ member_id: sellerId, page: 1, page_size: pageSize, sort, lang: locale });
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (sellerId) {
      fetchShopProducts({ member_id: sellerId, page: newPage, page_size: pageSize, sort, lang: locale });
    }
    // Scroll to products section
    setTimeout(() => {
      productsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    setPage(1);
    if (sellerId) {
      fetchShopProducts({ member_id: sellerId, page: 1, page_size: pageSize, sort: newSort, lang: locale });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4) return '#52c41a';
    if (score >= 3) return '#faad14';
    return '#ff4d4f';
  };

  if (!sellerId) {
    return (
      <div className={styles.shop}>
        <div className={styles.not_found}>
          <p>{t("shop_not_available")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.shop}>
      <h3 className={styles.title}>{t("shop_info")}</h3>

      {isShopInfoLoading ? (
        <div className={styles.loading_container}>
          <LoadingSpinner size="large" />
        </div>
      ) : shopInfo ? (
        <>
          {/* Shop Info Card */}
          <div className={styles.shop_card}>
            <div className={styles.shop_header}>
              <div className={styles.shop_avatar}>
                {shopInfo.shop_logo ? (
                  <img src={shopInfo.shop_logo} alt={shopInfo.shop_name} />
                ) : (
                  <SvgSelector id="shop-icon" />
                )}
              </div>
              <div className={styles.shop_details}>
                <h4 className={styles.shop_name}>
                  {shopInfo.shop_name || shopInfo.company_name || t("unknown_shop")}
                </h4>
                {shopInfo.location_str && (
                  <p className={styles.shop_location}>
                    <SvgSelector id="location-icon" />
                    {shopInfo.location_str}
                  </p>
                )}
                <div className={styles.shop_stats}>
                  {shopInfo.favorite_count && (
                    <span className={styles.stat_item}>
                      <span className={styles.stat_value}>{Number(shopInfo.favorite_count).toLocaleString()}</span>
                      <span className={styles.stat_label}>{t("followers")}</span>
                    </span>
                  )}
                  {shopInfo.tp_year && (
                    <span className={styles.stat_item}>
                      <span className={styles.stat_value}>{shopInfo.tp_year}</span>
                      <span className={styles.stat_label}>{t("years_on_platform")}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Shop Badges */}
            <div className={styles.badges_section}>
              {shopInfo.is_factory && (
                <Tag color="blue" className={styles.badge}>{t("badge_factory")}</Tag>
              )}
              {shopInfo.is_super_factory && (
                <Tag color="gold" className={styles.badge}>{t("badge_super_factory")}</Tag>
              )}
              {shopInfo.is_flagship_shop && (
                <Tag color="purple" className={styles.badge}>{t("badge_flagship")}</Tag>
              )}
              {shopInfo.is_industry_brand && (
                <Tag color="green" className={styles.badge}>{t("badge_brand")}</Tag>
              )}
              {shopInfo.is_tp && (
                <Tag color="cyan" className={styles.badge}>{t("badge_tp")}</Tag>
              )}
            </div>

            {/* Shop Ratings */}
            {shopInfo.shop_ratings && shopInfo.shop_ratings.length > 0 && (
              <div className={styles.ratings_section}>
                <h5 className={styles.ratings_title}>{t("shop_ratings")}</h5>
                <div className={styles.ratings_grid}>
                  {shopInfo.shop_ratings.map((rating, idx) => {
                    const score = parseFloat(rating.score);
                    return (
                      <div key={idx} className={styles.rating_item}>
                        <div className={styles.rating_header}>
                          <span className={styles.rating_label}>{rating.title}</span>
                          <span 
                            className={styles.rating_score}
                            style={{ color: getScoreColor(score) }}
                          >
                            {rating.score}
                          </span>
                        </div>
                        <Progress 
                          percent={score * 20} 
                          showInfo={false}
                          strokeColor={getScoreColor(score)}
                          trailColor="#f0f0f0"
                          size="small"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Contact Info */}
            {shopInfo.contact_info && shopInfo.contact_info.contact_name && (
              <div className={styles.contact_section}>
                <h5 className={styles.contact_title}>{t("contact_info")}</h5>
                <div className={styles.contact_details}>
                  <span className={styles.contact_name}>
                    {shopInfo.contact_info.contact_name}
                    {shopInfo.contact_info.job_title && (
                      <span className={styles.job_title}> - {shopInfo.contact_info.job_title}</span>
                    )}
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className={styles.action_buttons}>
              {shopInfo.shop_url && (
                <a
                  href={shopInfo.shop_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.visit_shop_btn}
                >
                  {t("visit_shop")}
                  <SvgSelector id="external-link" />
                </a>
              )}
              {shopInfo.chat_url && (
                <a
                  href={shopInfo.chat_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.chat_btn}
                >
                  {t("chat_with_seller")}
                </a>
              )}
            </div>
          </div>

          {/* Show Products Button */}
          {!showProducts ? (
            <div className={styles.show_products_section}>
              <Button
                type="primary"
                size="large"
                onClick={handleShowProducts}
                loading={isProductsLoading}
                className={styles.show_products_btn}
              >
                {t("show_shop_products")}
              </Button>
            </div>
          ) : (
            <>
              {/* Products Section */}
              <div className={styles.products_section} ref={productsSectionRef}>
                <div className={styles.products_header}>
                  <h4 className={styles.products_title}>
                    {t("shop_products")} ({totalProducts.toLocaleString()})
                  </h4>
                  <Select
                    value={sort}
                    onChange={handleSortChange}
                    className={styles.sort_select}
                    style={{ width: 160 }}
                  >
                    {SORT_OPTIONS.map((option) => (
                      <Select.Option key={option.value} value={option.value}>
                        {t(option.labelKey)}
                      </Select.Option>
                    ))}
                  </Select>
                </div>

                {isProductsLoading ? (
                  <div className={styles.loading_container}>
                    <LoadingSpinner size="large" />
                  </div>
                ) : shopProducts.length > 0 ? (
                  <>
                    <div className={styles.products_grid}>
                      {shopProducts.map((product, index) => (
                        <Card
                          key={product.id || index}
                          data={product}
                          isBlank={true}
                          enableAnimation={false}
                        />
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalProducts > pageSize && (
                      <div className={styles.pagination_container}>
                        <Pagination
                          current={page}
                          total={totalProducts}
                          pageSize={pageSize}
                          onChange={handlePageChange}
                          showSizeChanger={false}
                          showTotal={(total, range) => `${range[0]}-${range[1]} / ${total}`}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className={styles.not_found}>
                    <Empty description={t("no_shop_products")} />
                  </div>
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <div className={styles.not_found}>
          <p>{t("shop_info_not_available")}</p>
        </div>
      )}
    </div>
  );
};

export default Shop;
