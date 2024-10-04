import { toast } from "react-hot-toast";

import { apiConnector } from "../apiconnector";
import { contentEndpoints } from "../apis";

export const getJobpostData = async (token, navigate, isLoading = false) => {
  const toastId = !isLoading ? "" : toast.loading("Loading...");
  let data = [];

  try {
    const response = await apiConnector("GET", contentEndpoints.JOBS, null, {
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

export const setJobpostData = async (token, object, navigate) => {
  const toastId = toast.loading("Sending...");

  try {
    const response = await apiConnector(
      "PUT",
      contentEndpoints.JOBS,
      { ...object },
      { authorization: `Bearer ${token}` }
    );

    if (response.status === 201) {
      toast.success("Job Added successfully.");
      navigate("/admin/jobs");
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

  toast.dismiss(toastId);
};

export const updateJobpostData = async (token, object, navigate) => {
  const toastId = toast.loading("Updating...");

  try {
    const response = await apiConnector(
      "POST",
      contentEndpoints.JOBS,
      { ...object },
      { authorization: `Bearer ${token}` }
    );

    if (response.status === 201) {
      toast.success("Job Added successfully.");
      navigate("/admin/jobs");
    } else {
      toast.error("Something went wrong. Try again");
    }
  } catch (error) {
    console.log(error);
    if (error.response.data.message !== "Internal Server Error") {
      // toast.error(error.response.data.text);
      // localStorage.removeItem("token");
      // navigate("/login");
    } else {
      toast.error(error.response.data.text);
    }
  }

  toast.dismiss(toastId);
};

export const deleteJobposttData = async (token, id, navigate) => {
  const toastId = toast.loading("Requesting...");
  let data = [];

  try {
    const response = await apiConnector(
      "DELETE",
      contentEndpoints.JOBS + `?id=${id}`,
      null,
      {
        authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 200) {
      toast.success("Job Deleted successfully.");
      data = await getJobpostData(token, navigate);
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
  toast.dismiss(toastId);

  return data;
};
