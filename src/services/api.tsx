/** @format */

import { UserBasketPostInterface } from "@/interfaces";
import Axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_BACK_URL;

let defaultObj = {
  baseURL: BASE_URL + "api/",
  headers: {
    Accept: "application/json,text/*;q=0.99",
    "Content-Type": "application/json",
  },
};

export const axiosInstance = Axios.create(defaultObj);

export const API = {
  // HomePage
  getHomePageSlider: () => axiosInstance.get("sliders"),

  getHomePageProducts: () => axiosInstance.get("products?query=Discount"),

  getHomePageCategoryProducts: () => axiosInstance.get("additional-categories"),

  getHomePageCategoryProductsToken: (token?:string) =>
    axiosInstance
      .get(`additional-categories${token && token !== "undefined" ? "-token" : ""}`,{
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res),

  // SearchPage
  getSearchPageProducts: (query: any) =>
    axiosInstance.get(`search-products-from-taobao?searchQuery=${query}`),

  getProductDetail: (query: any) =>
    axiosInstance
      .get(`product-detail-from-taobao?productId=${query}`)
      .then((res) => res.data),

  getProductDetailToken: (query: any,lang:string, token?:string) =>
    axiosInstance
      .get(`product-detail-from-taobao${token && token !== "undefined" ? "-token" : ""}?productId=${query}&lang=${lang}`,{
        headers: {
          Authorization: "Bearer " + token,
          
        },
      })
      .then((res) => res.data),

  // CartPage
  getUserBasket: (token: string) =>
    axiosInstance
      .get(`get-user-basket`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res.data),

  // OrderPage
  getOrder: (token: string, id: string) =>
    axiosInstance
      .get(`get-order?order_id=${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res.data),

  // MyReviewsPage
  getReviews: (token: string, filter: string) =>
    axiosInstance
      .get(`user-products?filter=${filter}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res.data.data),

  // CargoPage
  getCargo: (token: string, id: string) =>
    axiosInstance
      .get(`get-cargo?order_id=${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res.data),

  //Auth Page
  postLogin: (accessToken: string) =>
    axiosInstance
      .post("google-login", { token: accessToken })
      .then((res) => res.data),

  userBasketFromStorage: (token: string, data: UserBasketPostInterface[]) =>
    axiosInstance.post("user-basket", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(res => localStorage.removeItem('basket-data')),

  authCheckEmail: (email: string) =>
    axiosInstance.post("check-email", { email: email }).then((res) => res.data),

  //PurchasesPage
  getPurchases: (token: string, filter: string) =>
    axiosInstance
      .get(`get-orders?filter=${filter}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res.data.orders),

  // LikedProducts
  getWishesPageProducts: (token: string) =>
    axiosInstance.get("liked-products", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }),
};
