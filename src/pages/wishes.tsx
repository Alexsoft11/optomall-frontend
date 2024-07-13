import { API } from '@/services/api';
import dynamic from 'next/dynamic';
import React from 'react'

interface WishesProps {
    wishesData: { wishes: any[] };
}

const Wishes = dynamic(
    () => import("@/features/Wishes/components/Wishes")
    // {
    //   loading: () => <Loader />,
    // }
);

const WishesPage = ({ wishesData }: WishesProps) => {
    console.log(wishesData)
  return (
    <>
        <Wishes wishesData={wishesData}/>
    </>
  )
}

export default WishesPage

export const getServerSideProps = async (context: any) => {
    try {
      const wishesResponse = await API.getWishesPageProducts();
        console.log(wishesResponse)
      return {
        props: {
            wishesData: wishesResponse.data || [],
        },
      };
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
      return {
        props: {
            wishesData: [],
        },
      };
    }
  };
  