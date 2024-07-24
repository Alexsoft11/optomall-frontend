import { StaticImageData } from "next/image";

export interface MyReviewsReviewedInterface {
    id: number,
    image: string,
    // company: string,
    name: string,
    date: string,
    stars?: number,
    review?: string,
    photos?: StaticImageData[]
}
