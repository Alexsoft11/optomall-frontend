interface CategoryName {
  uz: string;
  ru: string;
  en: string;
}

interface ProductTitle {
  uz: string;
  ru: string;
  en: string;
}

interface ProductDescription {
  uz: string;
  ru: string;
  en: string;
}

interface Product {
  id: number;
  title: ProductTitle;
  price: string;
  rating: number;
  quantity: number;
  description: ProductDescription;
}

export interface CategoryInterface {
  id: number;
  name: CategoryName;
  slug: string;
  image: string;
  image_mobile: string;
  is_active: number;
  products: Product[];
}

export interface ApiResponse {
  categories: CategoryInterface[];
}
