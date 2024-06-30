import { BASE_URL } from "@/services/api";
import useQueryApiClient from "@/utils/useQueryApiClient";
import axios from "axios";
import { useRouter } from "next/router";

// utils/validation.ts
export const validatePassword = (
  t: Function,
  currentValue: any,
  value: string
) => {
  const passwordRegex = /^[a-zA-Z0-9_]{8,}$/;
  if (!passwordRegex.test(value)) {
    return Promise.reject(new Error(t("Auth.minSymbolPassword")));
  }
  return Promise.resolve();
};

export const validateConfirmPassword = (t: Function, getFieldValue: any) => ({
  validator(currentValue: any, value: string) {
    if (!value || getFieldValue.getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error(t("Auth.passwordsIsDifferent")));
  },
});

export async function validateEmail(
  t: Function,
  currentValue: any,
  value: string,
  isRegistPage: boolean = false
) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(value)) {
    return Promise.reject(new Error(t("Auth.emailIncorect")));
  }

  return Promise.resolve();
}

export const validateConfirmCode = (
  t: Function,
  currentValue: any,
  value: string
) => {
  if (value.length !== 6) {
    return Promise.reject(new Error(t("Auth.confirmCodeIncorect")));
  }
  return Promise.resolve();
};

export const validatePhone = (
  t: Function,
  currentValue: any,
  value: string
) => {
  if (!/^(\d){9}$/m.test(value)) {
    return Promise.reject(new Error(t("Auth.requiredTelMessage")));
  }
  return Promise.resolve();
};
