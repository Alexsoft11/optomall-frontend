import { Category, Products } from "@/features/home";
import MainSlider from "@/features/home/components/MainSlider";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <MainSlider />
      <Category />
      <Products />
    </>
  );
}
