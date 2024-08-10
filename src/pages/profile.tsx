import ToLoginPage from "@/components/ToLoginPage";
import Profile from "@/features/Profile";
import { useJwt } from "@/utils/useJwt";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ProfilePage = () => {
  const user = useJwt();
  const router = useRouter();
  return (
    <div className="containerd">
      {user ? (
        <>
          <Profile />
        </>
      ) : (
        <div className="container"><ToLoginPage/></div>
      )}
    </div>
  );
};

export default ProfilePage;
