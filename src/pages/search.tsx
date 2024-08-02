import React from "react";
import GoToBack from "@/components/GoToBack";
import Search from "@/features/Search/components/Search";
import { API } from "@/services/api";
import Head from "next/head";
import { useRouter } from "next/router";

interface SearchProps {
  productsData: any;
}

const SearchPage = ({ productsData }: SearchProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        <GoToBack pathArr={[{ title: "results", path: "search" }]} />
      </div>
      <Search data={productsData?.products} />
    </>
  );
};

export default SearchPage;

export const getServerSideProps = async (context: any) => {
  try {

    const searchResponce = await API.getSearchPageProducts(context);
    console.log(context, "frfrfr")
    return {
      props: {
        productsData: searchResponce.data || [],
      },
    };
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        products: [],
      },
    };
  }
};
