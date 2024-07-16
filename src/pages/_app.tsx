import "@/styles/globals.css";
import "@/styles/antdStyle.scss";
import IntlWrapperProvider from "@/utils/intlWrapperProvider";
import type { AppProps } from "next/app";
import Head from "next/head";
import MainLayout from "@/components/Layout";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App({ Component, pageProps }: AppProps) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={`${clientId}`}>
      <IntlWrapperProvider>
        <MainLayout>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
        </MainLayout>
      </IntlWrapperProvider>
    </GoogleOAuthProvider>
  );
}
