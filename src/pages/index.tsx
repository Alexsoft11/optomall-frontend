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
  products: any;
}

export default function Home({ sliders, products }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <MainSlider data={sliders} />
      <Category />
      <Products products={products} />
    </>
  );
}

export const getServerSideProps = async (context: any) => {
  try {
    const slidersResponse = await API.getHomePageSlider();
    const productsResponse = await API.getHomePageProducts();

    return {
      props: {
        sliders: slidersResponse.data || [],
        products: productsResponse.data || [],
      },
    };
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        sliders: [],
        products: [],
      },
    };
  }
};
