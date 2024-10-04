import { toast } from "react-hot-toast";

import { apiConnector } from "../apiconnector";
import { contentEndpoints } from "../apis";

export const getUserData = async (token, navigate, isLoading = false) => {
  const toastId = !isLoading ? "" : toast.loading("Loading...");
  let data = [];

  try {
    const response = await apiConnector("GET", contentEndpoints.USER, null, {
      authorization: `Bearer ${token}`,
    });

    data = await response?.data?.data;
  } catch (error) {
    console.log(error);

    // if (error.response.data.message !== "Internal Server Error") {
    //   toast.error(error.response.data.text);
    //   localStorage.removeItem("token");
    //   navigate("/admin/login");
    // } else {
    //   toast.error(error.response.data.text);
    // }
  }

  toast.dismiss(toastId);

  return data;
};

export const deleteUserData = async (
  id,
  token,
  navigate,
  isLoading = false
) => {
  const toastId = !isLoading ? "" : toast.loading("Requesting...");
  let data = "";

  try {
    const response = await apiConnector(
      "DELETE",
      contentEndpoints.USER + `/${id}`,
      null,
      {
        authorization: `Bearer ${token}`,
      }
    );

    data = response?.status === 204 ? "success" : "error";
  } catch (error) {}

  toast.dismiss(toastId);

  return data;
};

export const UdateTopUserStatus = async (data) => {
  const toastId = toast.loading("Processing...");

  try {
    const response = await apiConnector(
      "PATCH",
      contentEndpoints.USER,
      { ...data },
      {}
    );

    if (response.status === 200) {
      toast.success("status updated successfully");
    }
  } catch (error) {}

  toast.dismiss(toastId);

  return;
};

export const getBusinessUser = async () => {
  const toastId = toast.loading("Processing...");

  let data = [];

  try {
    const response = await apiConnector(
      "GET",
      contentEndpoints.BUSINESS_USER,
      {},
      {}
    );

    if (response.status === 200) {
      data = response.data.data;
    }
  } catch (error) {}

  toast.dismiss(toastId);

  return data;
};

export const getBusinessUserDetails = async (id) => {
  const toastId = toast.loading("Processing...");

  let data = [];

  try {
    const response = await apiConnector(
      "GET",
      contentEndpoints.BUSINESS_USER_DETAILS + id,
      {},
      {}
    );

    if (response.status === 200) {
      data = response.data;
    }
  } catch (error) {}

  toast.dismiss(toastId);

  return data;
};

export const getBusinessUserReviews = async (id) => {
  const toastId = toast.loading("Processing...");

  let data = [];

  try {
    const response = await apiConnector(
      "GET",
      contentEndpoints.BUSINESS_USER_REVIEWS + id,
      {},
      {}
    );

    if (response.status === 200) {
      data = response.data.data;
    }
  } catch (error) {}

  toast.dismiss(toastId);

  return data;
};

export const getBusinessUserReports = async (id) => {
  const toastId = toast.loading("Processing...");

  let data = [];

  try {
    const response = await apiConnector(
      "GET",
      contentEndpoints.BUSINESS_USER_REPORTS + id,
      {},
      {}
    );

    if (response.status === 200) {
      data = response.data.data;
    }
  } catch (error) {}

  toast.dismiss(toastId);

  return data;
};

export const getBusinessUserSubscriptionHistory = async (id) => {
  const toastId = toast.loading("Processing...");

  let data = [];

  try {
    const response = await apiConnector(
      "GET",
      contentEndpoints.BUSINESS_USER_SUBSCRIPTION + id,
      {},
      {}
    );

    if (response.status === 200) {
      data = response.data.data;
    }
  } catch (error) {}

  toast.dismiss(toastId);

  return data;
};
