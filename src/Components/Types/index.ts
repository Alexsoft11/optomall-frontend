import { StaticImageData } from "next/image";

export interface ProductCardInterface {
    title?: string;
    price?: string; 
    imageUrl: StaticImageData;
}