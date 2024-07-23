import React from "react";
import Head from "next/head";
import GoToBack from "@/components/GoToBack";
import { useTranslations } from "next-intl";
import PageTitle from "@/components/PageTitle";
import dynamic from "next/dynamic";
import { API } from "@/services/api";
import cookie from "cookie";
import { LoadingSpinner } from "@/ui/Spin";
import { CargoDataInterface } from "@/features/Cargo/interfaces";

const CargoPage = dynamic(
  () => import("@/features/Cargo/Components/CargoPage"),
  {
    loading: () => <LoadingSpinner fullscreen={true} size="large" />,
  }
);

interface Props {
  cargoData: CargoDataInterface;
}

export default function Cargo({ cargoData }: Props) {
  const t = useTranslations("GLOBAL");

  return (
    <div className="container">
      <Head>
        <title>{t("cargo")}</title>
      </Head>
      <div>
        <GoToBack pathArr={[{ title: "cargo", path: "" }]} />
        <PageTitle />
        <CargoPage cargoData={cargoData} />
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  try {
    const cookies = cookie.parse(context.req.headers.cookie || "");

    // Extract the token from the parsed cookies
    const token = decodeURIComponent(cookies.token);
    const { id } = context.query;

    const cargoResponse = await API.getCargo(token, id);

    return {
      props: {
        cargoData: cargoResponse.order as CargoDataInterface || [],
      },
    };
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        cargoData: [],
      },
    };
  }
};
