import { toast } from "react-hot-toast";

import { apiConnector } from "../apiconnector";
import { contentEndpoints } from "../apis";

export const getListingData = async (token, navigate, isLoading = false) => {
  const toastId = !isLoading ? "" : toast.loading("Loading...");
  let data = [];

  try {
    const response = await apiConnector("GET", contentEndpoints.LISTING, null, {
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

export const deleteListingData = async (
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
      contentEndpoints.LISTING + `/${id}`,
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

export const claimAdminListing = async (id) => {
  const toastId = toast.loading("Requesting...");
  let data = "";

  try {
    const response = await apiConnector(
      "POST",
      contentEndpoints.LISTING,
      { ...id },
      {}
    );

    data = response?.status === 200 ? "success" : "error";
  } catch (error) {
    console.log(error);
  }

  toast.dismiss(toastId);

  return data;
};

export const uploadInBulk = async (data) => {
  const toastId = toast.loading("Uploading...");
  let d = [];
  try {
    const response = await apiConnector(
      "POST",
      contentEndpoints.BULKUPLOAD,
      data,
      {}
    );

    if (response.status === 201) {
      toast.success("Listing uploaded successfully");
      d = response.data.data;
    }
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error("somthing went wrong try again");
    }
  }

  toast.dismiss(toastId);

  return d;
};

export const updateListingData = async (data) => {
  const toastId = toast.loading("Uploading...");

  console.log(data);
  try {
    const response = await apiConnector(
      "PATCH",
      contentEndpoints.LISTING,
      { ...data },
      {}
    );

    if (response.status === 200) {
      toast.success("Status Updated successfully");
    }
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error("somthing went wrong try again");
    }
  }

  toast.dismiss(toastId);
};

export const deleteCategory = async (data) => {
  const toastId = toast.loading("Processing...");
  try {
    const response = await apiConnector(
      "DELETE",
      contentEndpoints.QUEYCATEGORY + `/${data}`,
      {},
      {}
    );

    if (response.status === 204) {
      toast.success("Category delete successfully");
    }
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error("somthing went wrong try again");
    }
  }

  toast.dismiss(toastId);
};

export const updateCategory = async (data) => {
  const toastId = toast.loading("Uploading...");
  try {
    const response = await apiConnector(
      "PATCH",
      contentEndpoints.QUEYCATEGORY,
      { ...data },
      {}
    );

    if (response.status === 200) {
      toast.success("Category Updated successfully");
    }
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error("somthing went wrong try again");
    }
  }

  toast.dismiss(toastId);
};

export const updateCategoryonTop = async (data) => {
  const toastId = toast.loading("Updating...");
  try {
    const response = await apiConnector(
      "PUT",
      contentEndpoints.QUEYCATEGORY,
      { ...data },
      {}
    );

    if (response.status === 200) {
      toast.success("Category Updated successfully");
    }
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error("somthing went wrong try again");
    }
  }

  toast.dismiss(toastId);
};

export const GetCategory = async (page, filter) => {
  let data = [];
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector(
      "GET",
      contentEndpoints.BUSINESS_CATEGORY + page,
      {},
      {}
    );

    if (response.status === 200) {
      data = response.data;
    } else {
      toast.error(
        "We're sorry, but something went wrong. Please refresh this page."
      );
    }
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error("somthing went wrong try again");
    }
  }

  toast.dismiss(toastId);

  return data;
};

export const addBusiness = async (fata) => {
  let data = [];

  const toastId = toast.loading("Uploading...");

  const response = await apiConnector(
    "POST",
    contentEndpoints.ADDBUSINESS,
    { ...fata },
    {}
  );

  if (response.status === 201) {
    toast.success("Business added successfully");
  } else {
    toast.error(
      "We're sorry, but something went wrong. Please refresh this page."
    );
  }

  toast.dismiss(toastId);

  return data;
};

export const getBusinessDetails = async (fata) => {
  let data = [];

  const toastId = toast.loading("loading...");

  const response = await apiConnector(
    "GET",
    contentEndpoints.ADDBUSINESS + `/${fata}`,
    {},
    {}
  );

  if (response.status === 200) {
    data = response.data.data;
  } else {
    toast.error(
      "We're sorry, but something went wrong. Please refresh this page."
    );
  }

  toast.dismiss(toastId);

  return data;
};

export const updateBusinessDetails = async (fata) => {
  const toastId = toast.loading("updating...");

  const response = await apiConnector(
    "PATCH",
    contentEndpoints.ADDBUSINESS,
    { ...fata },
    {}
  );

  if (response.status === 200) {
    toast.success("listing updated successfully");
  } else {
    toast.error(
      "We're sorry, but something went wrong. Please refresh this page."
    );
  }

  toast.dismiss(toastId);
};

export const getSubscriptionDetails = async () => {
  const toastId = toast.loading("loading...");
  let data = [];
  const response = await apiConnector(
    "GET",
    contentEndpoints.SUBSCRIPTION,
    {},
    {}
  );

  if (response.status === 200) {
    data = response.data.data;
  } else {
    toast.error(
      "We're sorry, but something went wrong. Please refresh this page."
    );
  }

  toast.dismiss(toastId);
  return data;
};
