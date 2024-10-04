import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({});

type RawAxiosHeaders = { [key: string]: AxiosHeaderValue };
type AxiosHeaderValue = string;

export const apiConnector = (
  method: AxiosRequestConfig["method"],
  url: string,
  bodyData?: unknown,
  headers?: RawAxiosHeaders,
  params?: unknown
) => {
  const config: AxiosRequestConfig = {
    method,
    url,
    data: bodyData || null,
    headers: headers,
    params: params || null,
  };

  return axiosInstance(config);
};
