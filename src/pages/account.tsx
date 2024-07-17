import { LoadingSpinner } from "@/ui/Spin";
import useQueryApiClient from "@/utils/useQueryApiClient";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import GoToBack from "@/components/GoToBack";
import { useTranslations } from "next-intl";
import PageLayout from "@/components/Layout/PageLayout";

const AccountInfo = dynamic(
  () => import("@/features/Account/components/AccountInfo"),
  {
    loading: () => <LoadingSpinner fullscreen={true} size="large" />,
  }
);

const AccountPage =  () => {
  const [user, setUser] = useState();

  const { } = useQueryApiClient({
    request: {
      url: "user-get-data",
      method: "GET",
    },
    onSuccess(res) {
      setUser(res);
    },
  });
  const t =  useTranslations("Account");
  return (
    <div className="container">
      <PageLayout
        metaTitle={t("metaTitle")}
        metaDescription={t("metaDescription")}
        metaKeywords={t("metaKeywords")}
      >
        <GoToBack pathArr={[{ title: "my_account", path: "/" }]} />
        <AccountInfo user={user} />
      </PageLayout>
    </div>
  );
};

export default AccountPage;

export const getServerSideProps = async (context: any) => {
  return {
    props: {
      messages: (await import(`../translate/${context.locale}.json`)).default,
    },
  };
};
