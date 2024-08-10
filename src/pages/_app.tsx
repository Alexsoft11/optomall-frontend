import "@/styles/globals.css";
import "@/styles/antdStyle.scss";
import IntlWrapperProvider from "@/utils/intlWrapperProvider";
import type { AppProps } from "next/app";
import Head from "next/head";
import MainLayout from "@/components/Layout";
import { GoogleOAuthProvider } from "@react-oauth/google";
import '../../node_modules/animate.css/animate.min.css';
import { useRouter } from "next/router";
import { useJwt } from "@/utils/useJwt";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const { pathname, push, asPath } = useRouter()
  const token = useJwt()
  const protectPages = ['/messages', '/my-reviews', '/purchases']
  useEffect(() => {
    if (!token && protectPages.includes(pathname)) push(`/auth?step=signin&backUrl=${asPath}`)
  }, [asPath])

  return (
    <GoogleOAuthProvider clientId={`${clientId}`}>
      <IntlWrapperProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </IntlWrapperProvider>
    </GoogleOAuthProvider>
  );
}
