import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { contentEndpoints } from "../apis";

export const getUserData = async <E extends string | number | boolean>(
  token: E
): Promise<unknown> => {
  let data: (string | number | object)[] = [];

  try {
    const response: any = await apiConnector({
      method: "GET",
      url: contentEndpoints.USER,
      bodyData: null,
      headers: { authorization: `Bearer ${token}` },
      params: null,
    });

    data = response?.data;
  } catch (error) {
    toast.error("Error fetching user data");
  }

  return data;
};
