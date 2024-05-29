import { SliderImg } from "$/assets/images";
import CustomSliders from "@/Components/CustomSliders";
import { MainSlider, Products } from "@/Features/home";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Home</h1>
      <MainSlider/>
      <Products/>
    </>
  );
}
