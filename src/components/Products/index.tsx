import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./Products.module.scss";
import Card from "../Card";

interface Props {
  data: any;
  getProductsData: any;
}

const Products = ({ data, getProductsData }: Props) => {
  const [items, setItems] = useState(data);
  const [hasMore, setHasMore] = useState(true);
  const [productsCount, setProductsCount] = useState(20);

  const fetchMoreData = async () => {
    const newCount = productsCount + 20;
    setProductsCount(newCount);
    await getProductsData({ count: newCount });
  };

  useEffect(() => {
    if (data.length >= productsCount) {
      setItems(data.slice(0, productsCount));
    } else {
      setHasMore(false);
    }
  }, [data, productsCount]);

  return (
    <div className={styles.products}>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {items.map((el: any, idx: number) => (
          <Card key={idx} data={el} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Products;
