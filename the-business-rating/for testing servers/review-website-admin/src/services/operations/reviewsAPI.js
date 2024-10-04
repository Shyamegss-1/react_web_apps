import { toast } from "react-hot-toast";

import { apiConnector } from "../apiconnector";
import { contentEndpoints } from "../apis";

export const getReviewData = async (token, navigate, isLoading = false) => {
  const toastId = !isLoading ? "" : toast.loading("Loading...");
  let data = [];

  try {
    const response = await apiConnector("GET", contentEndpoints.REVIEWS, null, {
      authorization: `Bearer ${token}`,
    });

    data = await response?.data?.reviews;
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

export const deleteReviewData = async (
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
      contentEndpoints.REVIEWS + `/${id}`,
      null,
      {
        authorization: `Bearer ${token}`,
      }
    );

    data = response?.status === 204 ? "success" : "error";
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

export const updateReviewStatus = async (
  object,
  token,
  navigate,
  isLoading = false
) => {
  const toastId = toast.loading("Requesting...");
  let data = "";

  try {
    const response = await apiConnector(
      "POST",
      contentEndpoints.REVIEWS,
      { ...object },
      {
        authorization: `Bearer ${token}`,
      }
    );

    data = response?.status === 200 ? "success" : "error";
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

export const getReviewReport = async () => {
  const toastId = toast.loading("Requesting...");
  let data = "";

  try {
    const response = await apiConnector(
      "GET",
      contentEndpoints.REVIEW_REPORT,
      {},
      {}
    );

    data = response?.data?.data;
  } catch (error) {
    console.log(error);
  }

  toast.dismiss(toastId);

  return data;
};
