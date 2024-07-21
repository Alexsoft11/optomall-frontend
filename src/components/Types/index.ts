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
  country: string | undefined;
  addressDetails: string | undefined;
  area: string | undefined;
  street: string | undefined;
  house: string | undefined;
  region: string | undefined;
}