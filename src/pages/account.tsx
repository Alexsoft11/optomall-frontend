import { LoadingSpinner } from "@/ui/Spin";
import useQueryApiClient from "@/utils/useQueryApiClient";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import GoToBack from "@/components/GoToBack";
import { useTranslations } from "next-intl";

const AccountInfo = dynamic(
  () => import("@/features/Account/components/AccountInfo"),
  {
    loading: () => <LoadingSpinner fullscreen={true} size="large" />,
  }
);

const AccountPage = () => {
  const [user, setUser] = useState();
  const { appendData: getSlidersData } = useQueryApiClient({
    request: {
      url: "user-get-data",
      method: "GET",
    },
    onSuccess(res) {
      setUser(res);
    },
  });
const t = useTranslations("")
  return (
    <div className="container">
        <GoToBack pathArr={[{ title: "my_account", path: "/" }]} />
      <AccountInfo user={user} />
    </div>
  );
};

export default AccountPage;
