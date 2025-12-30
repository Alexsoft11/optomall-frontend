import { message } from "antd";
import { useTranslations } from "next-intl";
import { FormInstance } from "antd/lib/form";
import { UseLogOut } from "./useLogOut";

interface ErrorProps {
  [key: string]: any;
  data?: any;
  error?: any;
  message?: string;
  errors?: any;
}

function useHandleError(form?: FormInstance) {
  const t = useTranslations("Error");
  const handleError = (data: ErrorProps) => {

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
    } else if (form && data.error && typeof data.error === "object" && !data.message) {
      const keys = Object.keys(data.error);
      const fields = keys.map((field) => ({
        name: field,
        errors: Array.isArray(data.error[field])
          ? data.error[field].map((error: string) => t(`${field}.${error}`))
          : [],
      }));
      form.setFields(fields);
    } else if (form && data && typeof data === "object" && !data.message && !data.error && !data.errors) {
      const keys = Object.keys(data);
      const isValidation = keys.some((k) => Array.isArray(data[k]));

      if (isValidation) {
        const fields = keys.map((field) => ({
          name: field,
          errors: Array.isArray(data[field])
            ? data[field].map((error: string) => t(`${field}.${error}`))
            : [],
        }));
        form.setFields(fields);
      }
    } else if (data.message?.includes("Unauthenticated")) {
      UseLogOut();
    }
  };

  return [handleError];
}

export default useHandleError;
