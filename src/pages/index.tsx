import { Category, MainSlider, Products } from "@/features/home";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <MainSlider/>
      <Category/>
      <Products/>
    </>
  );
}
