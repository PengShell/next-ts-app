import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export type UseHttpSendRequestFunc<T, D> = (
  a: RequestConfig<T>,
  b: UseHttpCallbackFunc<D>
) => Promise<void>;

export type UseHttpCallbackFunc<T> = (a: T) => any;

export interface UseHttpHookRetType<T, D> {
  isLoading: boolean;
  error: string | null;
  sendRequest: UseHttpSendRequestFunc<T, D>;
}

export type RequestConfig<T = any> = AxiosRequestConfig<T>;

const useHttp = <T, D>(): UseHttpHookRetType<T, D> => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = useCallback(
    async (
      requestConfig: RequestConfig<T>,
      applyData: UseHttpCallbackFunc<D>
    ) => {
      setIsLoading(true);
      setError(null);
      try {
        const response: AxiosResponse<D, T> = await axios.request(
          requestConfig
        );
        applyData(response.data);
      } catch (err: unknown) {
        //error handler
        if (err instanceof Error) {
          setError(err.message || "Something went wrong!");
        } else {
          console.error(err);
        }
      }
      setIsLoading(false);
    },
    []
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
