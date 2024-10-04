import { toast } from "react-hot-toast";

import { apiConnector } from "../apiconnector";
import { contentEndpoints } from "../apis";

export const getSubcategoryData = async (
  token,
  navigate,
  isLoading = false
) => {
  const toastId = !isLoading ? "" : toast.loading("Loading...");
  let data = [];

  try {
    const response = await apiConnector(
      "GET",
      contentEndpoints.SUBCATEGORY,
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

export const setSubcategoryData = async (token, object, navigate) => {
  const toastId = toast.loading("Sending...");
  let data = [];

  try {
    const response = await apiConnector(
      "PUT",
      contentEndpoints.SUBCATEGORY,
      { ...object },
      { authorization: `Bearer ${token}` }
    );

    if (response.status === 201) {
      toast.dismiss(toastId);
      toast.success("Subcategory Added successfully.");
      data = await getSubcategoryData(token, navigate);
    } else {
      toast.error("Something went wrong. Try again");
    }
  } catch (error) {
    console.log(error);
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

export const updateSubcategoryData = async (token, object, navigate) => {
  const toastId = toast.loading("Updating...");
  let data = [];

  try {
    const response = await apiConnector(
      "POST",
      contentEndpoints.SUBCATEGORY,
      { ...object },
      {
        authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 200) {
      toast.dismiss(toastId);
      toast.success("Subcategory updated successfully.");
      data = await getSubcategoryData(token, navigate);
    } else {
      toast.error("Something went wrong. Try again");
    }
  } catch (error) {
    console.log(error);
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

export const deleteSubcategoryData = async (token, id, navigate) => {
  const toastId = toast.loading("Requesting...");
  let data = [];

  try {
    const response = await apiConnector(
      "DELETE",
      contentEndpoints.SUBCATEGORY + `?id=${id}`,
      null,
      {
        authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 200) {
      toast.dismiss(toastId);
      toast.success("Subcategory Deleted successfully.");
      data = await getSubcategoryData(token, navigate);
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
