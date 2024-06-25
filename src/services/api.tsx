/** @format */

import { useJwt } from "@/utils/useJwt";
import Axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_BACK_URL;

export const axiosInstance = Axios.create({
  baseURL: BASE_URL + "api",
  headers: {
    Accept: "application/json,text/*;q=0.99",
    "Content-Type": "application/json",
  },
  
});
export const axiosHeadersSetToken = async (context: any) => {
  const token: any = await useJwt();
  if (token) {
    axiosInstance.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
      "Accept-Language": context.locale,
    };
  }
  axiosInstance.defaults.headers.common = {
    ...axiosInstance.defaults.headers.common,
    "Accept-Language": context.locale,
  };
};

export const API = {
  updateUserEmail: (data: any) =>
    axiosInstance
      .post("profile/update-email", data)
      .then((res) => res.data?.data),
      updateUserName: (data: any) =>
      axiosInstance
        .post("profile/update-name", data)
        .then((res) => res.data?.data),
};
