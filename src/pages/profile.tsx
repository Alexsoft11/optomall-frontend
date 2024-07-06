import Profile from "@/features/Profile";
import { useJwt } from "@/utils/useJwt";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ProfilePage = () => {
  const user = useJwt();
  const router = useRouter()
  useEffect(()=>{
    if(!user){
      router.push("/auth")
    }
  },[user])
  console.log(user);
  return (
    <div className='containerd'>
      {user ? (
        <>
          <Profile />
        </>
      ) : (
        <div>
          login
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
