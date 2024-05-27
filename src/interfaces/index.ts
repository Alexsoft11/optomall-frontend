import { StaticImageData } from "next/image";

export interface CardInterface {
    id:string,
    title?: string;
    price?: string; 
    imageUrl: StaticImageData;
}