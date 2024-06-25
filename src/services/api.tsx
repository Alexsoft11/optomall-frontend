import Axios from "axios";


export const BASE_URL = process.env.NEXT_PUBLIC_BACK_URL;

export const axiosInstance = Axios.create({
  baseURL: BASE_URL + "/customapi",
  headers: {
    Accept: "application/json,text/*;q=0.99",
    "Content-Type": "application/json",
  },
});


export const API = {
  
};
