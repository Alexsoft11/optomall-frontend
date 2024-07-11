import { ProductImage } from "$/assets/images";
import { MyReviewsDataInterface } from "@/features/MyReviews/interfaces";

export const MyReviewsMockdata: MyReviewsDataInterface = {
  reviewed: [
    {
      id: 1,
      image: ProductImage,
      company: "SELFIK магазин игруш",
      name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      date: "10 мая 2024",
      stars: 5,
      review: "",
      photos: [ProductImage],
    },
    {
      id: 2,
      image: ProductImage,
      company: "SELFIK магазин игруш",
      name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      date: "10 мая 2024",
      stars: 5,
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      photos: [],
    },
    {
      id: 1,
      image: ProductImage,
      company: "SELFIK магазин игруш",
      name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      date: "10 мая 2024",
      stars: 3,
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      photos: [ProductImage, ProductImage, ProductImage],
    },
  ],
  waitForReview: [
    {
      id: 1,
      image: ProductImage,
      company: "SELFIK магазин игруш",
      name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      date: "10 мая 2024",
    },
    {
      id: 2,
      image: ProductImage,
      company: "SELFIK магазин игруш",
      name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      date: "10 мая 2024",
    },
    {
      id: 3,
      image: ProductImage,
      company: "SELFIK магазин игруш",
      name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      date: "10 мая 2024",
    },
    {
      id: 4,
      image: ProductImage,
      company: "SELFIK магазин игруш",
      name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      date: "10 мая 2024",
    },
    {
      id: 5,
      image: ProductImage,
      company: "SELFIK магазин игруш",
      name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      date: "10 мая 2024",
    },
  ],
};
