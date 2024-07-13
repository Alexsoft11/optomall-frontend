import { CartItemInterface } from "@/features/Cart/interface";
import { UserBasketPostInterface } from "@/interfaces";
import { API } from "@/services/api";

// utils/validation.ts
export const validatePassword = (
  t: Function,
  currentValue: any,
  value: string
) => {
  if (value.length < 8) {
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

  if (isRegistPage) {
    const response = await API.authCheckEmail(value);
    if (response.message === 'true') {
      return Promise.reject(new Error(t("Auth.emailAlredyUsed")));
    }
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

export const validateName = (t: Function, currentValue: any, value: string) => {
  const regex = /^[A-Za-z\s]+$/; // Regular expression to match letters and spaces
  if (!regex.test(value)) {
    return Promise.reject(new Error(t("Auth.nameValidateError")));
  }
  return Promise.resolve();
};

export const cookieBasket = (arr: CartItemInterface[]) => {
  const corectData: UserBasketPostInterface[] = [];
  arr.map((el) => {
    corectData.push({
      product_id: el.product_id,
      sizes: [
        {
          value: el.size as string,
          quantity: el.quantity,
          color_id: "0",
        },
      ],
    });
  });

  return corectData;
};
