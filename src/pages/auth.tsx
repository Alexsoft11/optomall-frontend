import React from "react";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/ui/Spin";
import PageLayout from "@/components/Layout/PageLayout";
import { useTranslations } from "next-intl";

const AuthPage = dynamic(() => import("@/components/Auth"), {
  loading: () => <LoadingSpinner fullscreen={true} />,
});

export default function Auth() {
  const t = useTranslations("Auth");

  return (
    <div>
      <PageLayout
        metaTitle={t("metaTitle")}
        metaDescription={t("metaDescription")}
        metaKeywords={t("metaKeywords")}
      >
        <AuthPage />
      </PageLayout>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  return {
    props: {
      messages: (await import(`../translate/${context.locale}.json`)).default,
    },
  };
};
