import { message } from "antd";
import { useTranslations } from "next-intl";
import { FormInstance } from "antd/lib/form";
import { UseLogOut } from "./useLogOut";

interface ErrorProps {
  data?: any;
  error?: boolean | string;
  message?: string;
  errors?: any;
}

function useHandleError(form?: FormInstance) {
  const t = useTranslations("Error");

  const handleError = (data: ErrorProps) => {
    console.log(data.message);

    if (data.error && data.message && data.message !== "validation_errors") {
      message.error(t(data.message));
    } else if (data.error === "invalid_unique_id") {
      message.error(t(data.error));
    } else if (data.message === "validation_errors" && form) {
      const fields = Object.keys(data.errors).map((field) => ({
        name: field,
        errors: data.errors[field].map((error: string) =>
          t(`${field}.${error}`)
        ),
      }));
      form.setFields(fields);
    } else if (data.message?.includes("Unauthenticated")) {
      UseLogOut();
    }
  };

  return [handleError];
}

export default useHandleError;
