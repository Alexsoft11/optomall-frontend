import { BASE_URL } from "@/services/api";
import useQueryApiClient from "@/utils/useQueryApiClient";
import axios from "axios";

// utils/validation.ts
export const validatePassword = (t: Function, currentValue: any, value: string) => {
  const passwordRegex = /^[a-zA-Z0-9_]{8,}$/;
  if (!passwordRegex.test(value)) {
    return Promise.reject(new Error(t('minSymbolPassword')));
  }
  return Promise.resolve();
};

export const validateConfirmPassword = (t: Function, getFieldValue: any) => ({
  validator(currentValue: any, value: string) {
    if (!value || getFieldValue.getFieldValue('password') === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error(t('passwordsIsDifferent')));
  },
});

export async function validateEmail(t: Function, currentValue: any, value: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(value)) {
    return Promise.reject(new Error(t('emailIncorect')));
  } else {
    // let response = await (await (axios.post(`${BASE_URL}api/check-email`, { email: value })).then(res => res.data.message))
    // if (response) {
    //   return Promise.reject(new Error(t('emailAlredyUsed')));
    // } else if (!response) {
    //   return Promise.resolve();
    // }
  }

  return Promise.resolve();
};

export const validateConfirmCode = (t: Function, currentValue: any, value: string) => {
  if (value.length !== 6) {
    return Promise.reject(new Error(t('confirmCodeIncorect')));
  }
  return Promise.resolve();
};

export const validatePhone = (t: Function, currentValue: any, value: string) => {
  if (!/^(\d){9}$/m.test(value)) {
    return Promise.reject(new Error(t('requiredTelMessage')));
  }
  return Promise.resolve();
};
