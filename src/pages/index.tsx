import Category from "@/featuredab/home/components/Category";
import MainSlider from "@/featuredab/home/components/MainSlider";
import Products from "@/featuredab/home/components/Products";
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
