import { API } from "@/services/api";
import dynamic from "next/dynamic";
import React from "react";
import cookie from "cookie";
import { CardInterface } from "@/interfaces";

interface WishesProps {
  wishesData: CardInterface[];
}

const Wishes = dynamic(
  () => import("@/features/Wishes/components/Wishes")
  // {
  //   loading: () => <Loader />,
  // }
);

const WishesPage = ({ wishesData }: WishesProps) => {
  return (
    <>
      <Wishes wishesData={wishesData}/>
    </>
  );
};

export default WishesPage;

export const getServerSideProps = async (context: any) => {
  try {
    const cookies = cookie.parse(context.req.headers.cookie || "");

    const token = decodeURIComponent(cookies.token);
    const wishesResponse = await API.getWishesPageProducts(token);
    return {
      props: {
        wishesData: wishesResponse.data || [],
      },
    };
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        wishes: [],
      },
    };
  }
};
