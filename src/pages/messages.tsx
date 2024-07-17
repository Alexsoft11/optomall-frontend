import GoToBack from "@/components/GoToBack";
import PageTitle from "@/components/PageTitle";
import { MessagesMocdata } from "@/mockdata/Messages";
import { LoadingSpinner } from "@/ui/Spin";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const MessagesPage = dynamic(() => import("@/features/Messages/MessagesPage"), {
  loading: () => <LoadingSpinner className="global_page_loader" />,
});

export default function Messages() {
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
        <MessagesPage data={MessagesMocdata} />
      </div>
    </div>
  );
}
