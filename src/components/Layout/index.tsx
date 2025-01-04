import React, { ReactNode, useEffect, useState } from "react";
import Navbar from "../Navbar/index";
import Footer from "../Footer/index";
import "aos/dist/aos.css";
import AOS from "aos";
import { useRouter } from "next/router";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LoadingSpinner } from "@/ui/Spin";
import { useJwt } from "@/utils/useJwt";
import dayjs from "dayjs";
import Cookies from "universal-cookie";
import useQueryApiClient from "@/utils/useQueryApiClient";

interface ILayoutsProps {
  children: ReactNode;
}
/*************  ✨ Codeium Command 🌟  *************/
/**
 * The main layout component for the application.
 *
 * This component is responsible for rendering the main application layout, including the
 * navigation bar, main content area, and footer. It also handles client-side routing and
 * sets up the AOS animation library.
 *
 * @param {ILayoutsProps} props The properties for this component.
 * @returns {JSX.Element} The rendered JSX element.
 */
const MainLayout = ({ children }: ILayoutsProps) => {
  const { pathname, push, asPath, events } = useRouter();
  const [loading, setLoading] = useState(false);
  const token = useJwt();
  const cookie = new Cookies();

  const { appendData: resetToken } = useQueryApiClient({
    request: {
      url: "refresh-token",
      method: "POST",
    },
    onSuccess(res) {
      const maxAge = 10 * 24 * 60 * 60;
      if (res.new_token) {
        cookie.set("token", res.new_token, {
          path: "/",
          maxAge: maxAge,
        });
      }
    },
  });

  /**
   * Initializes the AOS animation library.
   */
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
    });
  }, []);

  /**
   * Handles client-side routing for protected pages.
   *
   * If the user is not logged in and tries to access a protected page, they will be
   * redirected to the login page.
   */
  const protectPages = ["/messages", "/my-reviews", "/purchases"];
  useEffect(() => {
    if (!token && protectPages.includes(pathname))
      // localStorage.setItem("backUrl", asPath);
      push(asPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath]);

  /**
   * Handles client-side routing events.
   *
   * This sets up event listeners for route change start, complete, and error events.
   * When a route change starts, the loading state is set to true. When the route change
   * is complete or an error occurs, the loading state is set to false.
   */
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

  useEffect(() => {
    const token = cookie.get("token");
    if (!token) {
      console.warn("Token not found");
      return;
    }

    const tokenSetTime = cookie.get("tokenSetTime");

    if (tokenSetTime) {
      const now = dayjs();
      const timeSinceSet = now.diff(dayjs(tokenSetTime), "hour");
      const timeSinceSetMin = now.diff(dayjs(tokenSetTime), "minute");

      if (timeSinceSet >= 12) {
        console.log("Token needs to be refreshed");
        resetToken();
        cookie.set("tokenSetTime", now.toISOString(), { path: "/" });
      } else {
        console.log(
          `Token is valid. Time since last refresh: ${timeSinceSet}:${timeSinceSetMin}`
        );
      }
    } else {
      // If `tokenSetTime` is not set, initialize it
      cookie.set("tokenSetTime", dayjs().toISOString(), { path: "/" });
    }
  }, []);

  /**
   * If the current page is an auth page, just render the children.
   */
  if (pathname.includes("auth")) {
    return children;
  }

  /**
   * Render the main application layout.
   */
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
