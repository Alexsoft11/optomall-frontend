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
  paramsSerializer: {
    indexes: true,
  },
};

export const axiosInstance = Axios.create(defaultObj);

export const API = {
  // HomePage
  getHomePageSlider: () => axiosInstance.get("sliders"),

  getHomePageProducts: (lang: any, token?: string) =>
    axiosInstance.get(
      `products?query=discount&productsCount=20&page=2&lang=${lang}`,
      {
        headers: token ? { Authorization: "Bearer " + token } : {},
      }
    ),

  getHomePageCategoryProducts: (limit: number) =>
    axiosInstance.get(`additional-categories?limit=${limit}`),

  getHomePageCategoryProductsToken: (limit: number, token?: string) =>
    axiosInstance
      .get(
        `additional-categories${
          token && token !== "undefined" ? "-token" : ""
        }?limit=${limit}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => res),

  //MessagesPage
  getMessages: (token: string) =>
    axiosInstance
      .get(`/user/messages`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res.data),

  // SearchPage
  getSearchPageProducts: (query: any, token?: string) =>
    axiosInstance.get(
      `search-products-from-taobao${
        token && token !== "undefined" ? "-token" : ""
      }?searchQuery=${query.query.query}&provider=${
        query.query.provider
      }&sort=${query.query.sort}&lang=${query.locale}&page=1`,
      {
        headers: token ? { Authorization: "Bearer " + token } : {},
      }
    ),
  getRecomendedProducts: (query: any, token?: string) =>
    axiosInstance.get(
      `search-products-from-taobao${
        token && token !== "undefined" ? "-token" : ""
      }?searchQuery=${query.query.query}&provider=${
        query.query.provider
      }&startPrice=${query.query.startPrice}&endPrice=${
        query.query.endPrice
      }&lang=${query.locale}&page=1`,
      {
        headers: token ? { Authorization: "Bearer " + token } : {},
      }
    ),

  //  ProductDetail
  getProductDetail: (params: any) =>
    axiosInstance
      .get(`product-detail-otapi`, { params: params })
      .then((res) => res.data),

  getProductDetailLocal: (params: any) =>
    axiosInstance
      .get(`product-detail-otapi?productId`, {
        params: params,
      })
      .then((res) => res.data),

  getProductComments: (query: any) =>
    axiosInstance.get(`get-comments?product_id=${query}`),

  // CartPage
  getUserBasket: (token: string, locale: string) =>
    axiosInstance
      .get(`get-user-basket?lang=${locale}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res.data),

  // OrderPage
  getOrder: (token: string, id: string, locale: string) =>
    axiosInstance
      .get(`get-order?order_id=${id}&locale=${locale}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res.data),

  getUserData: (token: string) =>
    axiosInstance
      .get(`user-get-data`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res.data),

  // MyReviewsPage
  getReviews: (token: string, filter: string, locale: string) =>
    axiosInstance
      .get(`user-products?filter=${filter}&lang=${locale}`, {
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
    axiosInstance
      .post("user-basket", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => localStorage.removeItem("basket-data")),

  authCheckEmail: (email: string) =>
    axiosInstance.post("check-email", { email: email }).then((res) => res.data),

  //PurchasesPage
  getPurchases: (token: string, filter: string, locale: string) =>
    axiosInstance
      .get(`get-orders?filter=${filter}&lang=${locale}`, {
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
