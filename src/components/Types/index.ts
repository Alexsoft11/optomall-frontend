export interface IGoToBack {
    pathArr?: IGoToBackObject[],
    styles?: { color: string },
    backUrl?: string
}

export interface IGoToBackObject {
    title?: string,
    path?: string,
    titleNotr?: string
}

export interface FooterInterface {
    id: number;
    name: string;
    path: string;
    icon: string;
}

export interface LocaleStringsInterface {
    uz: string;
    ru: string;
    en: string;
}
  