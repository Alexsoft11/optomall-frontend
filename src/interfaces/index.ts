import { StaticImageData } from "next/image";

export interface CardInterface {
  id: string;
  product_id: string;
  title?:
    | string
    | {
        uz: string;
        ru: string;
        en: string;
      };
  price?: string;
  image: StaticImageData;
  is_liked: boolean;
  provider: string;
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
  address: string;
  date: string;
}

export interface CatalogCategoriesInterface {
  id: number;
  imageUrl: StaticImageData;
  title: string;
}

export interface SubcategoryItem {
  id: number;
  name: string;
  slug: string;
  is_show: number;
}

export interface Subcategory {
  id: number;
  name: string;
  slug: string;
  items: SubcategoryItem[];
}

export interface CategoryInterface {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  image_url: string;
  subcategories: Subcategory[];
}

export interface SlidersDataInterface {
  id: number;
  url: string;
  image: StaticImageData;
  image_mobile: StaticImageData;
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
  imageUrl: string;
  subcategories: Subcategory[];
}

export interface SlidersDataInterface {
  id: number;
  url: string;
  image: StaticImageData;
  image_mobile: StaticImageData;
}

export interface LoginErrInterface {
  error: boolean;
  message: string;
}

export interface UserBasketPostInterface {
  product_id: string;
  sizes: UserBasketSizesInterface[];
}

export interface UserBasketSizesInterface {
  value: string;
  quantity: number;
  color_id: string;
}

export interface SelectOptionInterface {
  label: string;
  value: string;
}

export interface RegionProvincesInterface {
  tashkent: string[];
  andijan: string[];
  bukhara: string[];
  fergana: string[];
  jizzakh: string[];
  namangan: string[];
  navoiy: string[];
  qashqadaryo: string[];
  khorezm: string[];
  samarkand: string[];
  sirdaryo: string[];
  surxondaryo: string[];
  karakalpakstan: string[];
}

export interface LanguageStringIntergace {
  en: string;
  uz: string;
  ru: string;
}

export interface IAdditonalCategory {
  id: number;
  name: {
    uz: string;
    ru: string;
    en: string;
  };
  slug: string;
  image: string;
  image_mobile: string;
  is_active: number;
  products: IProductCard[];
}

export interface IProductCard {
  id: number;
  title: string;
  price: number;
  discounted_price: number;
  discount_percent: number;
  image: string;
  provider: string;
  is_liked: boolean;
}
