import { StaticImageData } from "next/image";

export interface CardInterface {
    id: string,
    title?: string;
    price?: string; 
    image: StaticImageData;
}

export interface CardCategoryInterface {
    id: number;
    title: string;
    link: string;
    imageUrl: StaticImageData;
}

export interface MainSliderItemInterface {
    image: StaticImageData;
}

export interface chequeSuccessDataInterface {
    address: string,
    date: string,
}

export interface CatalogCategoriesInterface {
    id: number;
    imageUrl: StaticImageData;
    title: string;
}

export interface CategoryCatalogInterface {
  id: string;
  name: string;
  provider: string;
  externalId: string;
}

export interface SubCategoryInterface {
    id: string;
    name: string;
    provider: string;
    externaId: string;
    parentId: string;
}

export interface SlidersDataInterface {
    id: number;
    url: string;
    image: StaticImageData;
}


export interface LoginErrInterface {
    error: boolean,
    message: string
}
