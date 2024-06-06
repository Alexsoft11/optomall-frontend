import Category from "@/featuress/home/components/Category";
import MainSlider from "@/featuress/home/components/MainSlider";
import Products from "@/featuress/home/components/Products";
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
