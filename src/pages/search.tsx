import React from "react";
import GoToBack from "@/components/GoToBack";
import Search from "@/features/Search/components/Search";
import { API } from "@/services/api";

interface SearchProps {
  productsData: any;
}

const SearchPage = ({ productsData }: SearchProps) => {
  return (
    <>
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
    console.log(context.query);
    const searchResponce = await API.getSearchPageProducts(context.query.query);

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
