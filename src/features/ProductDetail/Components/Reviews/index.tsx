/** @format */

import { Button, Rate, Segmented } from "antd";
import React, { FC, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Reviews.module.scss";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import SvgSelector from "$/assets/icons/SvgSelector";
import { IProductComments } from "../../interface";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { LoadingSpinner } from "@/ui/Spin";

const Reviews = () => {
  const t = useTranslations("Product-detail");
  const { query, locale } = useRouter();
  const [source, setSource] = useState<string | number>("platform");
  const [externalReviews, setExternalReviews] = useState<IProductComments[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);

  // Local Reviews Fetch
  const { data: productComments } = useQueryApiClient({
    request: {
      url: `get-comments?product_id=${query.id}`,
      method: "GET",
      disableOnMount: !query.id || source !== 'local',
    },
    enabled: !!query.id && source === 'local'
  });

  // External Reviews Fetch
  const { 
      data: externalData, 
      isLoading: isExternalLoading, 
      appendData: fetchExternal 
  } = useQueryApiClient({
    request: {
      url: `product-ratings`,
      method: "GET",
      disableOnMount: true,
    },
  });

  // Effect to trigger initial external fetch
  useEffect(() => {
      if (source === 'platform' && externalReviews.length === 0 && query.id) {
          fetchExternal({ item_id: query.id, page: 1, lang: locale });
      }
  }, [source, query.id]);

  // Effect to handle external data response
  useEffect(() => {
      if (externalData) {
          const newItems = externalData.items || [];
          
          if (newItems.length === 0) {
             setHasNext(false);
             return;
          }

          const mapped: IProductComments[] = newItems.map((item: any) => ({
              id: item.id || Math.random(), // fallback id
              product_id: Number(query.id) || 0,
              user_name: item.user_nick || 'Anonymous',
              created_at: item.feedback_date,
              rating: Number(item.rate_star),
              name: item.sku_map ? `${item.feedback}\n(${item.sku_map})` : item.feedback,
          }));
          
          if (externalData.page == 1) {
             setExternalReviews(mapped);
          } else {
             setExternalReviews(prev => [...prev, ...mapped]);
          }
          
          // Assume next page exists if we got data.
          setHasNext(true);
      }
  }, [externalData]);

  const handleLoadMore = () => {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchExternal({ item_id: query.id, page: nextPage, lang: locale });
  };

  const currentReviews = source === 'local' ? productComments : externalReviews;
  const isLoading = source === 'platform' && isExternalLoading && page === 1;

  // Translation keys might not exist for 'local'/'platform', using fallback text
  const options = [
      { label: t("local_reviews") === "Product-detail.local_reviews" ? "Local Reviews" : t("local_reviews") || "Local Reviews", value: 'local' },
      { label: t("platform_reviews") === "Product-detail.platform_reviews" ? "Platform Reviews" : t("platform_reviews") || "Platform Reviews", value: 'platform' }
  ];

  return (
    <>
      <div className={styles.reviews}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <h3 className={styles.title} style={{ margin: 0 }}>{t("comments")}</h3>
            <Segmented options={options} value={source} onChange={setSource} />
        </div>

        {isLoading ? (
            <div className={styles.comments_notfound}>
                <LoadingSpinner size="large" />
            </div>
        ) : (
            currentReviews && currentReviews.length > 0 ? (
            <>
                <div className={styles.navigators}>
                    <button className={`prev_btn_reviews ${styles.prev_btn} ${styles.swiper_btns}`}>
                    <SvgSelector id="prev-svg" />
                    </button>
                    <button className={`next_btn_reviews ${styles.next_btn} ${styles.swiper_btns}`}>
                    <SvgSelector id="next-svg" />
                    </button>
                </div>

                <div style={{ position: 'relative' }}>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={1.1}
                        navigation={{
                        nextEl: `.next_btn_reviews`,
                        prevEl: `.prev_btn_reviews`,
                        }}
                        breakpoints={{
                        960: { slidesPerView: 3 },
                        480: { slidesPerView: 2 },
                        380: { slidesPerView: 1.1 },
                        }}
                        pagination={{ clickable: true }}
                        modules={[Navigation]}
                    >
                        {currentReviews.map((review: any, index: number) => (
                        <SwiperSlide key={index} className={styles.stars}>
                            <div className={styles.review_card}>
                            <div className={styles.card_info}>
                                <div>
                                <p className={styles.card_info_title}>{review.user_name}</p>
                                <p className={styles.card_info_date}>{review.created_at}</p>
                                </div>
                                <Rate disabled defaultValue={review.rating} className={styles.stars} />
                            </div>
                            <p style={{ whiteSpace: 'pre-wrap' }}>{review.name}</p>
                            </div>
                        </SwiperSlide>
                        ))}
                         {source === 'platform' && hasNext && (
                            <SwiperSlide className={styles.stars}>
                                <div className={styles.review_card} style={{ justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '150px' }}>
                                    <Button onClick={handleLoadMore} loading={isExternalLoading} type="primary" shape="round">
                                        Load More
                                    </Button>
                                </div>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
            </>
            ) : (
            <div className={styles.comments_notfound}>
                 <p>{source === 'local' ? t("comments-not") : (isExternalLoading ? "" : "No platform reviews found.")}</p>
            </div>
            )
        )}
      </div>
    </>
  );
};

export default Reviews;
