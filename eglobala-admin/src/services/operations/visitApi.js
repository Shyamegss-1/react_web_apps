import { toast } from "react-hot-toast";

import { apiConnector } from "../apiconnector";
import { contentEndpoints } from "../apis";

export const getVisitorData = async (
  token,
  navigate,
  isLoading = false,
  table
) => {
  const toastId = !isLoading ? "" : toast.loading("Loading...");
  let data = [];

  try {
    const response = await apiConnector(
      "GET",
      contentEndpoints.VISITORS + `?t=${table}`,
      null,
      {
        authorization: `Bearer ${token}`,
      }
    );

    data = await response?.data?.data;
  } catch (error) {
    if (error.response.data.message !== "Internal Server Error") {
      toast.error(error.response.data.text);
      localStorage.removeItem("token");
      navigate("/admin/login");
    } else {
      toast.error(error.response.data.text);
    }
  }

  toast.dismiss(toastId);

  return data;
};

export const deleteVisitData = async (token, id, navigate, table) => {
  const toastId = toast.loading("Requesting...");
  let data = [];

  try {
    const response = await apiConnector(
      "DELETE",
      contentEndpoints.VISITORS + `?id=${id}&t=${table}`,
      null,
      {
        authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 200) {
      toast.dismiss(toastId);
      toast.success("Column Deleted successfully.");
      data = await getVisitorData(token, navigate, false, table);
    } else {
      toast.error("Something went wrong. Try again");
    }
  } catch (error) {
    if (error.response.data.message !== "Internal Server Error") {
      toast.error(error.response.data.text);
      localStorage.removeItem("token");
      navigate("/admin/login");
    } else {
      toast.error(error.response.data.text);
    }
  }

  return data;
};
