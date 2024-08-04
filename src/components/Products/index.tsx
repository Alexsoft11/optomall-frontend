import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./Products.module.scss";
import Card from "../Card";
import { LoadingSpinner } from "@/ui/Spin";
interface Props {
  data: any[];
  hasMore?: boolean;
  handleGetProduct?: (data?: any) => void;
}

const Products = ({ data, handleGetProduct, hasMore = false }: Props) => {
  const [items, setItems] = useState(data || []);
  const [page, setPage] = useState(1);

  const fetchMoreData = async () => {
    if (!handleGetProduct) {
      return;
    }
    const newCount = page + 1;
    setPage(newCount);
    handleGetProduct({ page: newCount });
  };

  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <div className={styles.products}>
      <InfiniteScroll
        dataLength={items?.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<LoadingSpinner size="large" />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className={styles.product_list}>
          {items?.map((el: any, idx: number) => (
            <Card key={idx} data={el} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Products;
