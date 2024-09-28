import { StaticImageData } from "next/image";

export interface MyReviewsReviewedInterface {
    id: number,
    image_url: string,
    company: string,
    name: string,
    date: string,
    stars?: number,
    comment?: string,
    photos?: StaticImageData[]
}
