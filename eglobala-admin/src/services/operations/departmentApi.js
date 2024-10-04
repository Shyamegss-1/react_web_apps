import { toast } from "react-hot-toast";

import { apiConnector } from "../apiconnector";
import { contentEndpoints } from "../apis";

export const getDepartmentData = async (token, navigate, isLoading = false) => {
  const toastId = !isLoading ? "" : toast.loading("Loading...");
  let data = [];

  try {
    const response = await apiConnector(
      "GET",
      contentEndpoints.DEPARTMENT,
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

export const setDepartmentData = async (token, object, navigate) => {
  const toastId = toast.loading("Sending...");
  let data = [];

  try {
    const response = await apiConnector(
      "PUT",
      contentEndpoints.DEPARTMENT,
      {
        title: object.title,
        description: object.description,
      },
      {
        authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 201) {
      toast.dismiss(toastId);
      toast.success("Department Added successfully.");
      data = await getDepartmentData(token, navigate);
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

export const updateDepartmentData = async (token, object, navigate) => {
  const toastId = toast.loading("Updating...");
  let data = [];

  try {
    const response = await apiConnector(
      "POST",
      contentEndpoints.DEPARTMENT,
      {
        id: object.id,
        title: object.title,
        description: object.description,
      },
      {
        authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 200) {
      toast.dismiss(toastId);
      toast.success("Department updated successfully.");
      data = await getDepartmentData(token, navigate);
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

export const deleteDepartmentData = async (token, id, navigate) => {
  const toastId = toast.loading("Requesting...");
  let data = [];

  try {
    const response = await apiConnector(
      "DELETE",
      contentEndpoints.DEPARTMENT + `?id=${id}`,
      null,
      {
        authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 200) {
      toast.dismiss(toastId);
      toast.success("Department Deleted successfully.");
      data = await getDepartmentData(token, navigate);
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
