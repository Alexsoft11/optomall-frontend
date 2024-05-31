import { SliderImg } from "$/assets/images";
import { MainSlider, Products } from "@/Features/home";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <MainSlider/>
      <Products/>
    </>
  );
}
