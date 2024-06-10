import { StaticImageData } from "next/image";

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