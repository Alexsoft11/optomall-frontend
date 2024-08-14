export interface IProductComments {
  id: number;
  product_id: number;
  user_name: string;
  name: string;
  rating: number;
  created_at: string;
}

export interface ColorImage {
  properties: string;
  url: string;
}

export interface PropsList {
  [key: string]: string;
}

export interface SKUProperty {
  name?: string;
  value: string;
  displayName?: string;
  displayValue?: string;
  imageUrl?: string | undefined;
  property_id?: string;
  selectedSku?: SKU;
}
interface ParsedProperty {
  id: string;
  name: string;
  value: string;
}

export interface GroupedProperties {
  [propId: string]: {
    keys: { imageUrl?: string; value: string; propId: string }[];
    propName: string;
    imageUrl?: string;
  };
}

export interface SelectedProperty {
  name: string;
  value: string;
}

// Interface for the SKU object
export interface SKU {
  price: number;
  total_price: number;
  orginal_price: number;
  properties: string;
  properties_name: string;
  quantity: number;
  selected_quantity: number;
  sku_id: string;
  parsedProperties?: ParsedProperty[];
}

export interface SellerInfoInterface {
  nick: string;
  item_score: number;
  score_p: number;
  delivery_score: number;
  shop_type: string;
  user_num_id: string;
  sid: string | null;
  title: string;
  zhuy: string;
  cert: string | null;
  open_time: string;
  credit_score: number | null;
  shop_name: string;
}
export interface ProductDetailInterface {
  id: string;
  title: string;
  price: number;
  discounted_price: number;
  discount_percentage: number;
  image: string;
  quantity: number;
  description: string;
  pictures: { image_url: string; is_main: number }[];
  location: string;
  product_url: string;
  videos: { url: string | null }[];
  skus: SKU[];
  props_list: PropsList;
  composition: { name: string; value: string }[];
  is_liked: boolean;
  seller_info: SellerInfoInterface;
  seller_id: string;
  prop_imgs: PropImage[];
}
export interface PropImage {
  properties: string;
  url: string;
}

export interface BasketInterface {
  product_id: string | undefined;
  title: string | undefined;
  price: number | undefined;
  color?: string | undefined;
  quantity: number;
  max_quantity: number | undefined;
  size: string | undefined;
  image_url: string | undefined;
  product_url: string | undefined;
  seller_id: string | undefined;
  provider: string | string[] | undefined;
  sku_id: string | undefined;
}

export interface ColorsBasketInterface {
  color: string;
  data: BasketInterface[];
}
