import React from "react";
import GoToBack from "@/components/GoToBack";
import PageTitle from "@/components/PageTitle";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Head from "next/head";
import { MyReviewsMockdata } from "@/mockdata/MyReviews";
import { LoadingSpinner } from "@/ui/Spin";

const MyReviewsPage = dynamic(
  () => import("@/features/MyReviews/components/MyReviewsPage"),
  {
    loading: () => <LoadingSpinner className="global_page_loader" />,
  }
);

export default function MyReviews() {
  const t = useTranslations("GLOBAL");
  return (
    <div className="container">
      <Head>
        <title>{t("my-reviews")}</title>
      </Head>
      <div>
        <GoToBack pathArr={[{ title: "my-reviews", path: "" }]} />
        <PageTitle />
        <MyReviewsPage data={MyReviewsMockdata} />
      </div>
    </div>
  );
}
