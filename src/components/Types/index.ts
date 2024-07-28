export interface IGoToBack {
  pathArr?: IGoToBackObject[];
  styles?: { color: string };
  backUrl?: string;
}

export interface IGoToBackObject {
  title?: string;
  path?: string;
  titleNotr?: string;
}

export interface LocationInfoInterface {
  name: string;
  url: string,
  region: string;
  district: string;
  street: string;
  house: string;
  post_index?: number | null;
}