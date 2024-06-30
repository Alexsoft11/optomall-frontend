import Axios from "axios";


export const BASE_URL = process.env.NEXT_PUBLIC_BACK_URL;

export const axiosInstance = Axios.create({
  baseURL: BASE_URL + "api/",
  headers: {
    Accept: "application/json,text/*;q=0.99",
    "Content-Type": "application/json",
  },
});


export const API = {
  // HomePage
  getHomePageSlider: () =>
    axiosInstance.get("sliders"),

  getHomePageProducts: () =>
    axiosInstance.get("products?query=Discount"),

  //SearchPage
  getSearchPageProducts: (query: any) =>
    axiosInstance.get(`search-products-from-taobao?searchQuery=${query}`),
};
