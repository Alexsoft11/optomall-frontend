import React from "react";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/ui/Spin";

const AuthPage = dynamic(() => import("@/components/Auth"),
  {
    loading: () => <LoadingSpinner className="global_page_loader" />,
  }
);

export default function Auth() {
  return (
    <div>
      <AuthPage />
    </div>
  );
}
