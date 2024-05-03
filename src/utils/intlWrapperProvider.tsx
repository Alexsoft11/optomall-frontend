import { IntlProvider } from "next-intl";
import React from "react";
import ru from "../translate/ru.json";
import en from "../translate/en.json";
import uz from "../translate/uz.json";
import { useRouter } from "next/router";

interface intlWrapperProviderProps {
  children: React.ReactNode;
}

const IntlWrapperProvider = ({ children }: intlWrapperProviderProps) => {
  const router = useRouter();
  const locale = router.locale || "ru";
  const message = locale === "uz" ? uz : locale === "en" ? en : ru;

  return (
    <IntlProvider messages={message} locale={locale}>
      {children}
    </IntlProvider>
  );
};

export default IntlWrapperProvider;
