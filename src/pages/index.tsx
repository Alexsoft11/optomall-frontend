import Category from "@/features/home/components/Category";
import MainSlider from "@/features/home/components/MainSlider";
import Products from "@/features/home/components/Products";
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
