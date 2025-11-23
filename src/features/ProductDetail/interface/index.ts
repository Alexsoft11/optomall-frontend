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

export interface TranslaedProps {
  [key: string]: string;
}

export interface PropsList {
  pid: string;
  prop_name: string;
  values: PropListItem[];
}

export interface PropListItem {
  imageUrl: string;
  name: string;
  vid?: string;
  id: string;
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
  originalName?: string;
  originalValue?: string;
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
  quantityRanges?: any[];
  package_info?: any;
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
  seller_user_id: string;
}

interface SellerInfo {
  nick: string; // Seller's nickname
  item_score: number; // Score for items (usually a float)
  score_p: number; // Score percentage (usually a float)
  delivery_score: number; // Score for delivery (usually a float)
  shop_type: string; // Type of the shop (could be an empty string if not specified)
  user_num_id: string; // User number ID (typically a string)
  sid: string | null; // Shop ID (could be a string or null)
  title: string; // Title of the shop (could be an empty string if not specified)
  zhuy: string; // URL for the shop
  cert: string | null; // Certification (could be a string or null)
  open_time: string; // Duration since the shop opened
  credit_score: string; // Credit score (usually a string)
  shop_name: string; // Name of the shop
}
export interface ProductDetailInterface {
  id: string;
  title: string;
  price: number;
  discounted_price: number;
  discount_percentage: number;
  image: string;
  quantity: number;
  quantityRanges?: any[];
  description: string;
  pictures: { image_url: string; is_main: number }[];
  location: string;
  product_url: string;
  videos: { url: string | null }[];
  skus: SKU[];
  props_list: PropsList[];
  composition: { key: string; value: string }[];
  is_liked: boolean;
  seller_info: SellerInfoInterface;
  seller_id: string;
  prop_imgs: PropImage[];
  description_images?: string[];
  sku_price_range?: any;
  delivery_info?: any;
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

export interface ProppertiesInterface {
  id: string;
  name: string;
  value: string;
}

export interface CreateOrderItemsDataInterface {
  product_id: string;
  title: string;
  image_url: string;
  quantity: number;
  price: number;
  seller_id: string;
  provider: string;
  sku_id: string;
  product_url: string;
  properties: ProppertiesInterface[];
}

export interface CreateOrderDataInterface {
  items: CreateOrderItemsDataInterface[];
  total_price: number;
}

export interface CreateBaskettemsDataInterface {
  product_id: string;
  title: string;
  image_url: string;
  quantity: number;
  max_quantity?: number;
  price: number;
  seller_id: string;
  provider: string;
  sku_id: string;
  product_url: string;
  properties: ProppertiesInterface[];
  quantityRanges?: any[];
  product_info?: any;
}
