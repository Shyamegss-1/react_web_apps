import axios, { AxiosResponse } from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = async ({
  method,
  url,
  bodyData,
  headers,
  params,
}: {
  method: string;
  url: string;
  bodyData: unknown;
  headers: Record<string, string> | null;
  params: string | null;
}): Promise<AxiosResponse<unknown>> => {
  const response = await axiosInstance({
    method: method,
    url: url,
    data: bodyData || null,
    headers: headers || {},
    params: params || null,
    withCredentials: true,
  });
  return response;
};
