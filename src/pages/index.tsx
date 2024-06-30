import React, { useEffect, useState } from "react";
import { CardInterface, SlidersDataInterface } from "@/interfaces";
import Head from "next/head";
import dynamic from "next/dynamic";
import { API } from "@/services/api";

const MainSlider = dynamic(
  () => import("@/features/home/components/MainSlider")
  // {
  //   loading: () => <Loader />,
  // }
);

const Category = dynamic(
  () => import("@/features/home/components/Category")
  // {
  //   loading: () => <Loader />,
  // }
);

const Products = dynamic(
  () => import("@/features/home/components/Products")
  // {
  //   loading: () => <Loader />,
  // }
);

interface HomeProps {
  sliders: SlidersDataInterface[];
  products: CardInterface[];
}

export default function Home({
  sliders,
  products,
}: HomeProps) {
  console.log(products, 'slidersData')
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <MainSlider data={sliders} />
      <Category />
      <Products products={products}/>
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  const slidersResponse = await API.getHomePageSlider().then((res: any) => res.data).catch((error: any) => {
    return { data: [] };
  });

  const productsResponse = await API.getHomePageProducts().then((res: any) => res.data).catch((error: any) => {
    return { data: [] };
  });


  return {
      props: {
        sliders: slidersResponse.data || [],
        products: productsResponse.data || [],
      },
    };
};
