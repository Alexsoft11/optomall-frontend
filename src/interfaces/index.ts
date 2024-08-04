import { StaticImageData } from "next/image";

export interface CardInterface {
    id: string,
    product_id: string;
    title?: string | {
        uz: string;
        ru: string;
        en: string;
    };
    price?: string; 
    image: StaticImageData;
    is_liked: boolean;
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

export interface SubcategoryItem {
    name: string;
    slug: string;
  }
  
 export interface Subcategory {
    name: string;
    slug: string;
    items: SubcategoryItem[];
  }
  
 export interface CategoryInterface {
    name: string;
    slug: string;
    subcategories: Subcategory[];
  }

export interface SlidersDataInterface {
    id: number;
    url: string;
    image: StaticImageData;
    image_mobile: StaticImageData;
}


export interface LoginErrInterface {
    error: boolean,
    message: string
}

export interface UserBasketPostInterface {
    product_id: string,
    sizes: UserBasketSizesInterface[]
}

export interface UserBasketSizesInterface {
    value: string,
    quantity: number,
    color_id: string
}


export interface LanguageStringIntergace {
    en: string,
    uz: string,
    ru: string,
}