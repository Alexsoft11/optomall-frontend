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
  selectedSku?: AttributesInterface;
}
interface ParsedProperty {
  id: string;
  name: string;
  value: string;
}

export interface AllDataItemInterface {
  miniImageUrl?: string;
  imageUrl?: string;
  Pid: string;
  Vid: string;
  PropertyName: string;
  Value: string;
  OriginalPropertyName: string;
  OriginalValue: string;
  IsConfigurator: boolean;
}

export interface ConfiguratorItemInterface {
  Pid: string;
  Vid: string;
  value: string;
  imageUrl?: string;
  name: string;
}

export interface ConfiguratorInterface {
  Id: string;
  Quantity: number;
  SalesCount: number;
  Configurators: ConfiguratorItemInterface[];
  Price: any;
}

export interface AllDataInterface {
  [key: string]: AttributesInterface[];
}

export interface GroupedProperties {
  [propId: string]: {
    keys: { imageUrl?: string; value: string; Vid: string; Pid: string }[];
    propName: string;
  };
}

export interface SelectedProperty {
  name: string;
  value: string;
}

// Interface for the SKU object
export interface AttributesInterface {
  imageUrl?: string;
  miniImageUrl?: string;
  originalPropertyName: string;
  originalValue: string;
  pid: string;
  propertyName: string;
  value: string;
  vid: string;
  isConfigurator: boolean;
}

interface Configurator {
  Pid: string; // Product ID
  Vid: string; // Variant ID
}

export interface ConfiguredItem {
  id: string;
  configurators: ConfiguratorItemInterface[];
  price: number;
  quantity: number;
  selected_quantity: number;
  quantityRanges: QuantityRange[];
  salesCount: number;
  name?: string;
  value?: string;
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
  description: string;
  pictures: { image_url: string; is_main: number }[];
  location: string;
  product_url: string;
  videos: { url: string | null }[];
  attributes: AttributesInterface[];
  props_list: PropsList;
  compositions: AttributesInterface[];
  configuredItems: ConfiguredItem[];
  is_liked: boolean;
  seller_info: SellerInfoInterface;
  seller_id: string;
  prop_imgs: PropImage[];
  quantityRanges: QuantityRange[];
}

interface QuantityRange {
  minQuantity: number;
  price: number;
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
  items: CreateBaskettemsDataInterface[];
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
  properties: ParsedProperty[];
  quantityRanges?: QuantityRange[];
}
