import { useJwt } from "@/utils/useJwt";
import Axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_BACK_URL;

let defaultObj = {
  baseURL: BASE_URL + "api/",
  headers: {
    Accept: "application/json,text/*;q=0.99",
    "Content-Type": "application/json",
  },
}



export const axiosInstance = Axios.create(defaultObj);

export const API = {
  // HomePage
  getHomePageSlider: () => axiosInstance.get("sliders"),

  getHomePageProducts: () => axiosInstance.get("products?query=Discount"),

  // SearchPage
  getSearchPageProducts: (query: any) => axiosInstance.get(`search-products-from-taobao?searchQuery=${query}`),

  // CartPage 
  getUserBasket: (token: string) => axiosInstance.get(`get-user-basket`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => res.data),

  // OrderPage 
  getOrder: (token: string, id: string) => axiosInstance.get(`get-order?order_id=${id}`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
    .then(res => res.data),

  //Auth Page
  postLogin: (accessToken: string) => axiosInstance.post('google-login', { token: accessToken })
  .then(res => res.data),

  //PurchasesPage
  getPurchases: (token: string, filter: string) => axiosInstance.get(`get-orders?filter=${filter}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => res.data.orders),
};
