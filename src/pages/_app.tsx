import "@/styles/globals.css";
import "@/styles/antdStyle.scss";
import IntlWrapperProvider from "@/utils/intlWrapperProvider";
import type { AppProps } from "next/app";
import Head from "next/head";
import MainLayout from "@/components/Layout";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "../../node_modules/animate.css/animate.min.css";
import "react-puzzle-captcha/dist/react-puzzle-captcha.css";

export default function App({ Component, pageProps }: AppProps) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

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
