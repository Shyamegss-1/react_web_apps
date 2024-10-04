import { apiConnector } from "../apiConnector";
import { UserDetailEndPoints } from "../apis";
import { userErrorAuthHandler } from "./authApis";

export const UserDetailApi = async (token, navigate) => {
  let data = {};

  try {
    const response = await apiConnector(
      "GET",
      UserDetailEndPoints.DETAILS,
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

export const UpdateUserProfile = async (token, navigate, data) => {
  let status = 404;
  try {
    const response = await apiConnector(
      "PUT",
      UserDetailEndPoints.DETAILS,
      { ...data },
      {
        authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 200) {
      status = 200;
    }
  } catch (error) {
    userErrorAuthHandler(error, navigate);
  }
  return status;
};

export const UpdateUserBusinessProfile = async (token, navigate, data) => {
  let status = 404;
  try {
    const response = await apiConnector(
      "PATCH",
      UserDetailEndPoints.DETAILS,
      { ...data },
      {
        authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 200) {
      status = 200;
    }
  } catch (error) {
    userErrorAuthHandler(error, navigate);
  }
  return status;
};

export const UpdateUserPassword = async (token, navigate, data) => {
  let status = 404;
  try {
    const response = await apiConnector(
      "PUT",
      UserDetailEndPoints.UPDATE_PASSWORD,
      { ...data },
      {
        authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 200) {
      status = 200;
    }
  } catch (error) {
    console.log(error);
    userErrorAuthHandler(error, navigate);
  }
  return status;
};

export const GetCategory = async (token, navigate) => {
  let data = [];

  try {
    const response = await apiConnector(
      "GET",
      UserDetailEndPoints.LISTING_CATEGORY,
      { ...data },
      {
        authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 200) {
      data = response.data;
    }
  } catch (error) {
    userErrorAuthHandler(error, navigate);
  }
  return data;
};

export const GetUserContact = async (token, navigate) => {
  let data = [];

  try {
    const response = await apiConnector(
      "GET",
      UserDetailEndPoints.USER_CONTACTS,
      { ...data },
      {
        authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 200) {
      data = response.data;
    }
  } catch (error) {
    userErrorAuthHandler(error, navigate);
  }

  return data;
};
