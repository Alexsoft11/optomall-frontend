import React, { ReactNode, useEffect, useState } from "react";
import Navbar from "../Navbar/index";
import Footer from "../Footer/index";
import "aos/dist/aos.css";
import AOS from "aos";
import { useRouter } from "next/router";
import Head from "next/head";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LoadingSpinner } from "@/ui/Spin";
import { useJwt } from "@/utils/useJwt";

interface ILayoutsProps {
  children: ReactNode;
}
const MainLayout = ({ children }: ILayoutsProps) => {
  const { pathname, push, asPath, events } = useRouter();
  const [loading, setLoading] = useState(false);
  const token = useJwt();

  // useEffect(() => {
  //   AOS.init({
  //     duration: 1000,
  //     easing: "ease-in-out",
  //   });
  // }, []);

  const protectPages = ["/messages", "/my-reviews", "/purchases"];
  useEffect(() => {
    if (!token && protectPages.includes(pathname))
      // localStorage.setItem("backUrl", asPath);
      push(asPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath]);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    events.on("routeChangeStart", handleStart);
    events.on("routeChangeComplete", handleComplete);
    events.on("routeChangeError", handleComplete);

    return () => {
      events.off("routeChangeStart", handleStart);
      events.off("routeChangeComplete", handleComplete);
      events.off("routeChangeError", handleComplete);
    };
  }, [events]);

  if (pathname.includes("auth")) {
    return children;
  }
  return (
    <>
      {loading && <LoadingSpinner fullscreen={true} size="large" />}
      <Navbar />
      <main className="main_page">{children}</main>
      <Footer />
      <SpeedInsights />
    </>
  );
};

export default MainLayout;
