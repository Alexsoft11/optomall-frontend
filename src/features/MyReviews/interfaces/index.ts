import { StaticImageData } from "next/image";

export interface MyReviewsDataInterface {
    reviewed: MyReviewsReviewedInterface[],
    waitForReview: MyReviewsReviewedInterface[],
}

export interface MyReviewsReviewedInterface {
    id: number,
    image: StaticImageData,
    company: string,
    name: string,
    date: string,
    stars?: number,
    review?: string,
    photos?: StaticImageData[]
}
