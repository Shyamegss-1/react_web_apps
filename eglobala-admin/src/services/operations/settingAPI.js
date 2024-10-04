import { toast } from "react-hot-toast";

import { apiConnector } from "../apiconnector";
import { contentEndpoints } from "../apis";

export const getQueryData = async (token, navigate, isLoading = false) => {
  const toastId = !isLoading ? "" : toast.loading("Loading...");
  let data = [];

  try {
    const response = await apiConnector("GET", contentEndpoints.SETTING, null, {
      authorization: `Bearer ${token}`,
    });

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

export const UpdatePassword = async (token, navigate, object) => {
  const toastId = toast.loading("Updating...");

  try {
    const response = await apiConnector(
      "POST",
      contentEndpoints.SETTING,
      { ...object },
      {
        authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 200) {
      toast.success("password updated successfully");
    }
  } catch (error) {
    if (
      error.response.data.message !== "Internal Server Error" &&
      error.response.data.message !== "Unauthorized"
    ) {
      toast.error(error.response.data.text);
      localStorage.removeItem("token");
      navigate("/admin/login");
    } else {
      toast.error(error.response.data.text);
    }
  }

  toast.dismiss(toastId);
};
