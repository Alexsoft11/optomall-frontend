export interface IGoToBack {
    pathArr: IGoToBackObject[];
    styles?: { color: string };
}


export interface IGoToBackObject {
    title?: string;
    path?: string;
    titleNotr?: string
}