import React, { useState, useEffect } from "react";
import styles from "./Products.module.scss";
import Card from "../Card";
import useProductStore from "../../store/useProductStore";
import { useTranslations } from "next-intl";
import { LoadingSpinner } from "@/ui/Spin";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  data: any[];
  hasMore?: boolean;
  handleGetProduct?: (data?: any, categoryId?: string) => void;
  type?: "simp" | "scroll" | "more";
  perPage?: number;
  scroolLoading?: boolean;
  categoryId?: string;
}

const Products = ({
  data = [],
  handleGetProduct,
  type,
  perPage = 1,
  scroolLoading,
  categoryId,
}: Props) => {
  const [page, setPage] = useState(perPage);
  const { scrollPosition, isBack } = useProductStore();
  const t = useTranslations("");

  const fetchMoreData = async () => {
    if (!handleGetProduct) return;
    setPage((prevPage) => prevPage + perPage);
    handleGetProduct({ page: page + perPage }, categoryId);
  };

  useEffect(() => {
    if ((type === "scroll" || type === "more") && isBack) {
      window.scrollTo(0, scrollPosition);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPosition]);

  return (
    <div className={styles.product_list_sec}>
      {type === "scroll" ? (
        <div className={styles.products_scroll}>
          <InfiniteScroll
            dataLength={data?.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<></>}
          >
            <div className={styles.product_list}>
              {data?.map((el: any, idx: number) => (
                <Card key={idx} data={el} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        <div className={styles.product_list}>
          {data?.map((item, idx) => (
            <Card key={idx} data={item} />
          ))}
        </div>
      )}
      {scroolLoading ? (
        <LoadingSpinner size="large" />
      ) : (
        type === "more" && (
          <div
            data-aos="fade-up"
            data-aos-duration="800"
            className={"load_more_button"}
            onClick={fetchMoreData}
          >
            {t("Products.load_more")}
          </div>
        )
      )}
    </div>
  );
};

export default Products;
