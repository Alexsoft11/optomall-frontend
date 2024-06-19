import React, { useState, useEffect } from "react";
import { ProductTabsData } from "@/constants/products";
import Products from "@/features/home/components/Products";
import { CardInterface, SlidersDataInterface } from "@/interfaces";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { message } from "antd/lib";
import Head from "next/head";
import MainSlider from "@/features/home/components/MainSlider";
import Category from "@/features/home/components/Category";

export default function Home() {
  const [slidersData, setSlidersData] = useState<SlidersDataInterface[]>([]);
  const [products, setProducts] = useState<CardInterface[]>([]);

  const { appendData: getSlidersData } = useQueryApiClient({
    request: {
      url: 'sliders',
      method: 'GET',
    },
    onSuccess(res) {
      setSlidersData(res.sliders);
      console.log(res.sliders);
    },
    onError(err) {
      message.error("Failed to fetch sliders");
    }
  });

  const { appendData: getProductsData, isLoading: isProductsLoading } = useQueryApiClient({
    request: {
      url: `products?query=&tab=:tab`,
      method: 'GET',
    },
    onSuccess(res: any) {
      setProducts(res.products);
    }
  });

  useEffect(() => {
    getSlidersData();
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <MainSlider data={slidersData} />
      <Category />
      <Products getProductsData={getProductsData} products={products}/>
    </>
  );
}
