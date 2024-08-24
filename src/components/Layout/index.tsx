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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
    });
  }, []);
  const { pathname, push, asPath } = useRouter();
  const token = useJwt();
  const protectPages = ["/messages", "/my-reviews", "/purchases"];
  useEffect(() => {
    if (!token && protectPages.includes(pathname))
      localStorage.setItem("backUrl", asPath);
    push(asPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath]);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  if (router.pathname.includes("auth")) {
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
