import Category from "@/features/home/components/Category";
import MainSlider from "@/features/home/components/MainSlider";
import Products from "@/features/home/components/Products";
import { SlidersDataInterface } from "@/interfaces";
import useQueryApiClient from "@/utils/useQueryApiClient";
import { message } from "antd/lib";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [slidersData, setSlidersData] = useState<SlidersDataInterface[]>([]);

  const { appendData: getSlidersData } = useQueryApiClient({
    request: {
        url: 'sliders',
        method: 'GET',
        disableOnMount: true,
    },
    onSuccess(res) {
      setSlidersData(res.sliders)
      console.log(res.sliders)
    },
    onError(err) {
        message.error('register failed :(')
    }
  })

  useEffect(() => getSlidersData(), []);
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <MainSlider data={slidersData} />
      <Category />
      <Products />
    </>
  );
}
