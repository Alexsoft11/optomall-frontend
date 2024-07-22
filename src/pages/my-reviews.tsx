import React from "react";
import GoToBack from "@/components/GoToBack";
import PageTitle from "@/components/PageTitle";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Head from "next/head";
import { MyReviewsMockdata } from "@/mockdata/MyReviews";
import cookie from "cookie";
import { LoadingSpinner } from "@/ui/Spin";
import { API } from "@/services/api";

const MyReviewsPage = dynamic(
  () => import("@/features/MyReviews/components/MyReviewsPage"),
  {
    loading: () => <LoadingSpinner className="global_page_loader" />,
  }
);

interface Props {
  purchasesData: [] | [];
}

export default function MyReviews() {
  const t = useTranslations("GLOBAL");
  return (
    <div className="container">
      <Head>
        <title>{t("my-reviews")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <GoToBack pathArr={[{ title: "my-reviews", path: "" }]} />
        <PageTitle />
        <MyReviewsPage data={MyReviewsMockdata} />
      </div>
    </div>
  );
}

// export const getServerSideProps = async (context: any) => {
//   try {
//     const cookies = cookie.parse(context.req.headers.cookie || "");

//     // Extract the token from the parsed cookies
//     const token = decodeURIComponent(cookies.token);
//     const { filter } = context.query;

//     const purchasesResponse = await API.getPurchases(token, filter);

//     return {
//       props: {
//         purchasesData: purchasesResponse || [],
//       },
//     };
//   } catch (error: any) {
//     console.error("Error fetching data:", error.message);
//     return {
//       props: {
//         purchasesData: [],
//       },
//     };
//   }
// };
