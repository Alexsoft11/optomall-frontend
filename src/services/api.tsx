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
  getHomePageSlider: () =>
    axiosInstance.get("sliders"),

  getHomePageProducts: () =>
    axiosInstance.get("products?query=Discount"),
};
