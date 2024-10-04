import { toast } from "react-hot-toast";

import { apiConnector } from "../apiconnector";
import { contentEndpoints } from "../apis";

export const getBlogData = async (token, navigate, isLoading = false) => {
  const toastId = !isLoading ? "" : toast.loading("Loading...");
  let data = [];

  try {
    const response = await apiConnector("GET", contentEndpoints.BLOG, null, {
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

export const insertBlogData = async (
  object,
  token,
  navigate,
  isLoading = false
) => {
  const toastId = !isLoading ? "" : toast.loading("Loading...");
  let data = [];

  try {
    const response = await apiConnector(
      "POST",
      contentEndpoints.BLOG,
      { ...object },
      {
        authorization: `Bearer ${token}`,
      }
    );

    data = await response?.data?.data;
    toast.success("Post created successfully");
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

export const updateBlogData = async (
  id,
  object,
  token,
  navigate,
  isLoading = false
) => {
  const toastId = !isLoading ? "" : toast.loading("Loading...");
  let data = [];

  try {
    const response = await apiConnector(
      "PUT",
      contentEndpoints.BLOG + `/${id}`,
      { ...object },
      {
        authorization: `Bearer ${token}`,
      }
    );

    //   data = await response?.data?.data;
    toast.success("Post updated successfully");
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

export const getBlogDataById = async (
  id,
  token,
  navigate,
  isLoading = false
) => {
  const toastId = !isLoading ? "" : toast.loading("Loading...");
  let data = [];

  try {
    const response = await apiConnector(
      "GET",
      contentEndpoints.BLOG_BY_ID + `/${id}`,
      null,
      {
        authorization: `Bearer ${token}`,
      }
    );

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

export const deleteBlogData = async (
  id,
  token,
  navigate,
  isLoading = false
) => {
  const toastId = !isLoading ? "" : toast.loading("Requesting...");
  let data = [];

  try {
    const response = await apiConnector(
      "DELETE",
      contentEndpoints.BLOG + `/${id}`,
      null,
      {
        authorization: `Bearer ${token}`,
      }
    );

    data = await response?.data?.data;

    toast.success("Post Deleted SuccessFully");
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

export const getBlogCommentDataById = async (
  id,
  isLoading = false,
  page = ""
) => {
  const toastId = !isLoading ? "" : toast.loading("Loading...");
  let data = [];

  try {
    const response = await apiConnector(
      "GET",
      contentEndpoints.BLOG_COMMENTS + `${id}` + page,
      null,
      {}
    );

    data = { data: response?.data?.data, sasa: response?.data?.length };
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

export const deleteBlogCommentDataById = async (id) => {
  const toastId = toast.loading("Processing...");
  let status;

  try {
    const response = await apiConnector(
      "DELETE",
      contentEndpoints.BLOG_COMMENTS + `${id}`,
      null,
      {}
    );

    status = response.status === 200 ? "success" : "error";
  } catch (error) {
    console.log(error);
  }

  toast.dismiss(toastId);

  return status;
};

export const updateBlogCommentDataById = async (id, sssss) => {
  const toastId = toast.loading("Processing...");
  let status;

  try {
    const response = await apiConnector(
      "PATCH",
      contentEndpoints.BLOG_COMMENTS + `${id}`,
      { status: sssss },
      {}
    );

    status = response.status === 200 ? "success" : "error";
  } catch (error) {
    console.log(error);
  }

  toast.dismiss(toastId);

  return status;
};

export const getBlogCategory = async () => {
  const toastId = toast.loading("Loading...");
  let data;

  try {
    const response = await apiConnector(
      "GET",
      contentEndpoints.BLOG_CATEGORY,
      {},
      {}
    );

    data = response.data.data;
  } catch (error) {
    console.log(error);
  }

  toast.dismiss(toastId);

  return data;
};

export const PostBlogCategory = async (d) => {
  const toastId = toast.loading("processing...");
  let data;

  try {
    const response = await apiConnector(
      "POST",
      contentEndpoints.BLOG_CATEGORY,
      { name: d },
      {}
    );

    data = response.data.data;

    if (response.status === 201) {
      toast.success("Category added successfully");
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }

  toast.dismiss(toastId);

  return data;
};

export const UpdateBlogCategory = async (d) => {
  const toastId = toast.loading("processing...");
  let data;

  try {
    const response = await apiConnector(
      "PATCH",
      contentEndpoints.BLOG_CATEGORY,
      { ...d },
      {}
    );

    data = response.data.data;

    if (response.status === 200) {
      toast.success("Category updated successfully");
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }

  toast.dismiss(toastId);

  return data;
};
export const deleteBlogCategory = async (id) => {
  const toastId = toast.loading("processing...");

  try {
    const response = await apiConnector(
      "DELETE",
      contentEndpoints.BLOG_CATEGORY + id,
      {},
      {}
    );

    if (response.status === 204) {
      toast.success("Category deleted successfully");
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }

  toast.dismiss(toastId);
};

export const getFooterSettingData = async (id) => {
  const toastId = toast.loading("Loading...");
  let data;

  try {
    const response = await apiConnector(
      "GET",
      contentEndpoints.SETTINGS,
      {},
      {}
    );

    data = response.data.data;
  } catch (error) {
    console.log(error);
  }

  toast.dismiss(toastId);

  return data;
};

export const updateFooterSettingData = async (id) => {
  const toastId = toast.loading("processing...");

  try {
    const response = await apiConnector(
      "PATCH",
      contentEndpoints.SETTINGS,
      { ...id },
      {}
    );

    if (response.status === 200) {
      toast.success("Footer Content updated successfully");
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }

  toast.dismiss(toastId);
};

export const postFooterSettingData = async (id) => {
  const toastId = toast.loading("processing...");

  try {
    const response = await apiConnector(
      "POST",
      contentEndpoints.SETTINGS,
      { ...id },
      {}
    );

    if (response.status === 200) {
      toast.success("Footer Content added successfully");
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }

  toast.dismiss(toastId);
};

export const deleteFooterSettingData = async (id) => {
  const toastId = toast.loading("processing...");

  try {
    const response = await apiConnector(
      "DELETE",
      contentEndpoints.SETTINGS + `?we=${id}`,
      {},
      {}
    );

    if (response.status === 204) {
      toast.success("Footer Content deleted successfully");
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }

  toast.dismiss(toastId);
};
