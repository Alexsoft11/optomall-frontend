import { StaticImageData } from "next/image";

export interface CardInterface {
    title?: string;
    price?: string; 
    imageUrl: StaticImageData;
}