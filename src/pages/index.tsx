import { SliderImg } from "$/assets/images";
import CustomSliders from "@/Components/CustomSliders";
import { Products } from "@/features/home";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const images = [
    SliderImg,
    SliderImg,
    SliderImg,
  ];
  
  const reviews = [
    {
      name: 'Ирина',
      date: '04 апреля 2023',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec erat ante, tempor ut ligula gravida, bibendum pulvinar massa.',
      stars: 5,
    },
    {
      name: 'Ирина',
      date: '04 апреля 2023',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec erat ante, tempor ut ligula gravida, bibendum pulvinar massa.',
      stars: 5,
    },
    {
      name: 'Ирина',
      date: '04 апреля 2023',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec erat ante, tempor ut ligula gravida, bibendum pulvinar massa.',
      stars: 5,
    },
    {
      name: 'Ирина',
      date: '04 апреля 2023',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec erat ante, tempor ut ligula gravida, bibendum pulvinar massa.',
      stars: 5,
    },
  ];
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Home</h1>
      <CustomSliders 
        SliderData={images.map((src, idx) => (
          <Image key={idx} src={src} alt='img' width={500} height={500} />
        ))} 
        dots={true}
        arrows={true}
        timeAutoPlay={8000}
        autoPlay={true}
      />
      <CustomSliders 
        SliderData={reviews.map((review, idx) => (
          <div key={idx}>
            <h3>{review.name}</h3>
            <p>{review.date}</p>
            <p>{review.text}</p>
            <div>{'★'.repeat(review.stars)}{'☆'.repeat(5 - review.stars)}</div>
          </div>
        ))} 
        dots={true}
        arrows={true}
        autoPlay={true}
        timeAutoPlay={8000}
      />
      <Products/>
    </>
  );
}
