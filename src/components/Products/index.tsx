import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./Products.module.scss";
import Card from "../Card";

interface Props {
  data: any[];
  getProductsData: any;
}

const Products = ({ data, getProductsData }: Props) => {
  const [items, setItems] = useState(data);
  const [hasMore, setHasMore] = useState(true);
  const [productsCount, setProductsCount] = useState(1);

  const fetchMoreData = async () => {
    console.log('fetchMoreData called');
    const newCount = productsCount + 1;
    setProductsCount(newCount);
    try {
      const newItems = await getProductsData({ page: newCount });

      console.log('newItems:', newItems);

      // Проверка на конец данных
      if (newItems.length === 0) {
        setHasMore(false);
        console.log('No more items to load');
      } else {
        setItems(prevItems => [...prevItems, ...newItems]);
        console.log('Items updated', [...items, ...newItems]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    console.log('Initial data:', data);
    setItems(data);
  }, [data]);

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
