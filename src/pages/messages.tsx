import GoToBack from "@/components/GoToBack";
import PageTitle from "@/components/PageTitle";
import { API } from "@/services/api";
import { LoadingSpinner } from "@/ui/Spin";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
import cookie from "cookie"
import { MessagesDataInterface } from "@/features/Messages/interface";

const MessagesPage = dynamic(() => import("@/features/Messages/MessagesPage"), {
  loading: () => <LoadingSpinner className="global_page_loader" />,
});

interface Props {
  messagesData: MessagesDataInterface[];
}
export default function Messages({ messagesData }: Props) {
  
  const t = useTranslations("GLOBAL");
  return (
    <div className="container">
      <Head>
        <title>{t("messages")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <GoToBack pathArr={[{ title: "messages", path: "" }]} />
        <PageTitle />
        <MessagesPage messagesData={messagesData} />
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  try {
    const cookies = cookie.parse(context.req.headers.cookie || "");

    // Extract the token from the parsed cookies
    const token = decodeURIComponent(cookies.token);
    const messagesResponse = await API.getMessages(token);
    
    return {
      props: {
        messagesData: messagesResponse.messages as MessagesDataInterface[] || [],
      },
    };
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        reviewsData: [],
      },
    };
  }
};

