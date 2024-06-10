import Category from "@/features/Home/components/Category";
import MainSlider from "@/features/Home/components/MainSlider";
import Products from "@/features/Home/components/Products";
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
