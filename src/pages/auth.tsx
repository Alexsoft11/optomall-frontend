import React from "react";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/ui/Spin";

const AuthPage = dynamic(() => import("@/components/Auth"), {
  loading: () => <LoadingSpinner fullscreen={true} />,
});

export default function Auth() {
  return (
    <div>
      <AuthPage />
    </div>
  );
}
