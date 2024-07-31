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
  url?: string,
  adressText: string
}