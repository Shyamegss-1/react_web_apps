import { customToast } from "../../utils/customToast";
import { apiConnector } from "../apiConnector";
import { AdvertismentEndPoints } from "../apis";
import { userErrorAuthHandler } from "./authApis";

export const GetAdDetails = async (token, navigate) => {
  let data = {};

  try {
    const response = await apiConnector(
      "GET",
      AdvertismentEndPoints.AD_BASE,
      {},
      {
        authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 200) {
      data = response.data.data;
    }
  } catch (error) {
    userErrorAuthHandler(error, navigate);
  }

  return data;
};

export const UpdateAdDetails = async (token, navigate, object) => {
  let data = {};

  try {
    const response = await apiConnector(
      "PUT",
      AdvertismentEndPoints.AD_BASE,
      { ...object },
      {
        authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 200) {
      data = response.data.data;
    }
  } catch (error) {
    userErrorAuthHandler(error, navigate);
  }

  return data;
};

export const InsertNewMedia = async (token, navigate, object) => {
  try {
    const response = await apiConnector(
      "POST",
      AdvertismentEndPoints.MEDIA_BASE,
      { ...object },
      {
        authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 201) {
      customToast("Media uploaded successfully", "success");
    }
  } catch (error) {
    userErrorAuthHandler(error, navigate);
  }
};

export const GetMedia = async (token, navigate) => {
  let data = [];

  try {
    const response = await apiConnector(
      "GET",
      AdvertismentEndPoints.MEDIA_BASE,
      {},
      {
        authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 200) {
      data = response.data.data;
    }
  } catch (error) {
    userErrorAuthHandler(error, navigate);
  }

  return data;
};

export const deleteMedia = async (token, navigate, id) => {
  try {
    const response = await apiConnector(
      "DELETE",
      AdvertismentEndPoints.MEDIA_BASE + `/${id}`,
      {},
      {
        authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 204) {
      customToast("Media deleted successfully", "success");
    }
  } catch (error) {
    userErrorAuthHandler(error, navigate);
  }
};

export const PurchaseHandler = async (token, navigate, object) => {
  try {
    const response = await apiConnector(
      "POST",
      AdvertismentEndPoints.SUBSCRIPTION,
      { ...object },
      {
        authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 201) {
      customToast("Plan Purchased successfully", "success");
    }
  } catch (error) {
    userErrorAuthHandler(error, navigate);
  }
};

export const checkuserSubscription = async (token) => {
  let data = {};

  try {
    const response = await apiConnector(
      "GET",
      AdvertismentEndPoints.SUBSCRIPTION + "?notb_69=true",
      {},
      {
        authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 200) {
      data = response.data.data;
    }
  } catch (error) {
    userErrorAuthHandler(error);
  }

  return data;
};

export const UserSubscriptionDetails = async (token, navigate) => {
  let data = {};

  try {
    const response = await apiConnector(
      "GET",
      AdvertismentEndPoints.SUBSCRIPTION_DETAILS,
      {},
      {
        authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 200) {
      data = response.data.data;
    }
  } catch (error) {
    userErrorAuthHandler(error, navigate);
  }

  return data;
};

export const UserSubscriptionHistory = async (token, navigate) => {
  let data = [];

  try {
    const response = await apiConnector(
      "GET",
      AdvertismentEndPoints.SUBSCRIPTION_HISTORY,
      {},
      {
        authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 200) {
      data = response.data.data;
    }
  } catch (error) {
    userErrorAuthHandler(error, navigate);
  }

  return data;
};
