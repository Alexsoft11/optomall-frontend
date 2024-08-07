import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./Products.module.scss";
import Card from "../Card";
import { LoadingSpinner } from "@/ui/Spin";
interface Props {
  data: any[];
  hasMore?: boolean;
  handleGetProduct?: (data?: any) => void;
  type?: "simp" | "scroll";
}

const Products = ({
  data = [],
  handleGetProduct,
  hasMore = false,
  type,
}: Props) => {
  const [page, setPage] = useState(2);

  const fetchMoreData = async () => {
    if (!handleGetProduct) {
      return;
    }
    const newCount = page + 1;
    setPage(newCount);
    handleGetProduct({ page: newCount });
  };

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
            <Card key={idx} data={el} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  ) : (
    <div className={styles.product_list}>
      {data.map((item, idx) => (
        <Card key={idx} data={item} />
      ))}
    </div>
  );
};

export default Products;
