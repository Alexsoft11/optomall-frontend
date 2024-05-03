import useHandleError from "./useHandleError";
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/router";
import { env } from "process";

interface InvalidRequestResponse {
  status_code: number;
  message: string;
}

interface RequestProps {
  url: string;
  data?: any;
  method?: RequestMethod;
  mustRetry?: boolean;
  multipart?: boolean;
  enableOnMount?: boolean;
  disableOnMount?: boolean;
  baseUrl?: string;
}

interface UseQueryApiClientProps {
  request: RequestProps;
  onSuccess?: (response: any, passOnSuccess?: any) => void;
  onError?: (response: any) => void;
  onFinally?: () => void;
  enabled?: boolean;
}

interface ErrorProps {
  data: any;
  error: string;
  global?: boolean;
}

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// DON'T TOUCH IF YOU DON'T UNDERSTAND
function useQueryApiClient({
  request,
  onSuccess,
  onError,
  onFinally,
  enabled = true,
}: UseQueryApiClientProps) {
  const method = request?.method || "GET";
  const [receivedData, setReceivedData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(
    enabled ? method === "GET" && !request?.disableOnMount : false
  );
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isRefetching, setIsRefetching] = useState<boolean>(false);
  const router = useRouter();
  const [handleError] = useHandleError();

  const enableOnMount = request?.enableOnMount; // For methods except 'GET'
  const disableOnMount = request?.disableOnMount; // For method 'GET'

  useEffect(() => {
    //Enable or disable on mount fetch
    if (!disableOnMount && (enableOnMount || method === "GET")) {
      actualCall(
        request.url,
        request?.data,
        request?.method,
        request?.mustRetry,
        request?.multipart,
        {},
        request.baseUrl
      );
    }
  }, [enabled, disableOnMount, enableOnMount]); // eslint-disable-line react-hooks/exhaustive-deps

  const refetch = () => {
    setIsRefetching(true);
    actualCall(
      request.url,
      request?.data,
      method,
      request?.mustRetry,
      request?.multipart,
      {},
      request.baseUrl
    );
  };

  const parsedError = (response: InvalidRequestResponse) => {
    return {
      status: response.status_code,
      message: response.message,
    };
  };

  const appendData = (data?: any, urlParams?: any, passOnSuccess?: any) => {
    let url = request.url;
    if (urlParams) {
      Object.entries(urlParams).forEach((entry: any) => {
        const key = entry[0];
        const value = entry[1];

        url = url.replace(":" + key, value);
      });
    }

    actualCall(
      url,
      data,
      request?.method,
      request?.mustRetry,
      request?.multipart,
      passOnSuccess,
      request.baseUrl
    );
  };

  const actualCall: any = async (
    url: string,
    data: any = {},
    method: RequestMethod = "GET",
    mustRetry: boolean = true,
    multipart: boolean = false,
    passOnSuccess: any = {},
    baseUrl: string = ""
  ) => {
    if (!enabled) {
      return;
    }

    setIsLoading(true);

    const requestConfig: AxiosRequestConfig = {
      url: url,
      method: method,
      baseURL: baseUrl || process.env.base_url,
      responseType: multipart ? "blob" : "json",
      paramsSerializer: {
        indexes: true,
      },
      headers: {
        "Content-Type": multipart ? "multipart/form-data" : "application/json",     
      },
    };

    //set data in right place
    if (method === "GET") {
      requestConfig.params = data;
    } else {
      requestConfig.data = data;
    }

    try {
      //call request
      const response = await axios.request(requestConfig);

      const responseContent = response.data;

      //if status code is error type, throw error
      if (responseContent && responseContent.status_code > 299) {
        throw parsedError(responseContent);
      }

      setReceivedData(responseContent);
      setIsSuccess(true);
      onSuccess && onSuccess(responseContent, passOnSuccess); //Call onSuccess if set

      return responseContent;
    } catch (e: any) {
      const response = e.response;
      console.error(e);
      setIsError(true);
      const actualError: ErrorProps =
        typeof response === "object" && response.hasOwnProperty("data")
          ? response.data
          : e;

      onError && onError(actualError); //Call onSuccess if set
      handleError(actualError); //hook for global handling of errors
    } finally {
      onFinally && onFinally(); //Call onFinally if set
      setIsRefetching(false);
      setIsLoading(false);
    }
  };

  return {
    data: receivedData,
    isLoading: isLoading,
    isSuccess: isSuccess,
    refetch: refetch,
    isError: isError,
    isRefetching: isRefetching,
    appendData: appendData,
  };
}

export default useQueryApiClient;
