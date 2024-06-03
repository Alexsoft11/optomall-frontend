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

export const validateEmail = (t: Function, currentValue: any, value: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(value)) {
    return Promise.reject(new Error(t('emailIncorect')));
  }
  return Promise.resolve();
};

export const validateConfirmCode = (t: Function, currentValue: any, value: string) => {
  if (value.length !== 6) {
    return Promise.reject(new Error(t('confirmCodeIncorect')));
  }
  return Promise.resolve();
};
