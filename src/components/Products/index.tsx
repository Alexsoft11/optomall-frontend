import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./Products.module.scss";
import Card from "../Card";
import { LoadingSpinner } from "@/ui/Spin";
import useSearchStore from "../useSearchStore";
interface Props {
  data: any[];
  hasMore?: boolean;
  handleGetProduct?: (data?: any) => void;
  type?: "simp" | "scroll";
  perPage?: number;
}

const Products = ({
  data = [],
  handleGetProduct,
  hasMore = false,
  type,
  perPage = 1,
}: Props) => {
  const [page, setPage] = useState(perPage);
  const { scrollPosition, setScrollPosition } = useSearchStore();

  const fetchMoreData = async () => {
    if (!handleGetProduct) return;

    setScrollPosition(window.scrollY);
    setPage((prevPage) => prevPage + perPage);
    handleGetProduct({ page: page + perPage });
  };

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  return type == "scroll" ? (
    <div className={styles.products_scroll}>
      <InfiniteScroll
        dataLength={data?.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<></>}
      >
        <div className={styles.product_list}>
          {data?.map((el: any, idx: number) => (
            <Card isBlank={false} key={idx} data={el} />
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
  );
};

export default Products;
