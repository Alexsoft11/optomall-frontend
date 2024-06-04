import { StaticImageData } from "next/image";

export interface CardInterface {
    id:string,
    title?: string;
    price?: string; 
    imageUrl: StaticImageData;
}

export interface CardCategoryInterface {
    id: number;
    title: string;
    link: string;
    imageUrl: StaticImageData;
}

export interface MainSliderItemInterface {
    imageUrl: StaticImageData;
}