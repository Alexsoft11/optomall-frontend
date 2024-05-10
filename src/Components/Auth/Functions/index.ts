


export const validatePassword = (currentValue : any, value : string) => {
    const passwordRegex = /^[a-zA-Z0-9_]{8,}$/;
    if (!passwordRegex.test(value)) {
      return Promise.reject(new Error('Пароль должен содержать минимум 8 символов'));
    }
    return Promise.resolve();
};

export const validateConfirmPassword = (getFieldValue: any) => ({
    validator(currentValue : any, value : string) {
      if (!value || getFieldValue.getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Пароли не совпадают'));
    },
  });


export const validateEmail = (currentValue : any, value : string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(value)) {
      return Promise.reject(new Error('Введите действительный адрес электронной почты'));
    }
    return Promise.resolve();
  };

