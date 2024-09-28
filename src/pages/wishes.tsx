import { API } from "@/services/api";
import dynamic from "next/dynamic";
import React from "react";
import cookie from "cookie";
import { CardInterface } from "@/interfaces";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { LoadingSpinner } from "@/ui/Spin";

interface WishesProps {
}

const Wishes = dynamic(
  () => import("@/features/Wishes/components/Wishes")
);

const WishesPage = ({ }: WishesProps) => {
  const { data: wishesData, isLoading: isProductsLoading } =
    useQueryApiClient({
      request: {
        url: `liked-products`,
        method: "GET",
      },

    });

  return (
    <>
      {isProductsLoading ? <LoadingSpinner fullscreen /> : (
        <Wishes wishesData={wishesData} />
      )}
    </>
  );
};

export default WishesPage;
