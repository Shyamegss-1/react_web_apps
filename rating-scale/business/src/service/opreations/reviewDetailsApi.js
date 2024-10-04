import { customToast } from "../../utils/customToast";
import { apiConnector } from "../apiConnector";
import { UserReviewEndPoints } from "../apis";
import { userErrorAuthHandler } from "./authApis";

export const UserReviewStatsApi = async (token, navigate) => {
  let data = {};

  try {
    const response = await apiConnector(
      "PUT",
      UserReviewEndPoints.STATS,
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

export const UserReviewCAlcApi = async (token, navigate) => {
  let data = {};

  try {
    const response = await apiConnector(
      "GET",
      UserReviewEndPoints.STATS,
      {},
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

export const UserReviews = async (token, navigate, url) => {
  let data = {};

  console.log(url);

  try {
    const response = await apiConnector(
      "GET",
      `${UserReviewEndPoints.REVIEWS}${url ? url : ""}`,
      {},
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

export const UserReviewReply = async (token, navigate, obe) => {
  let data = 404;

  try {
    const response = await apiConnector(
      "POST",
      UserReviewEndPoints.REVIEWS,
      { ...obe },
      {
        authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 200) {
      data = 200;
    }
  } catch (error) {
    userErrorAuthHandler(error, navigate);
  }

  return data;
};

export const UserReviewReports = async (token, navigate) => {
  let data = [];

  try {
    const response = await apiConnector(
      "GET",
      UserReviewEndPoints.REPORTS,
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

export const UserReviewReportsActionHandler = async (token, navigate, data) => {
  let status = "";

  try {
    const response = await apiConnector(
      "POST",
      UserReviewEndPoints.REPORTS,
      { ...data },
      {
        authorization: `Bearer ${token}`,
      }
    );

    if (response.status === 200) {
      status = response.status;

      customToast(
        `The action has been successfully completed, and you have the flexibility to modify it at any time.`,
        "success"
      );
    }
  } catch (error) {
    userErrorAuthHandler(error, navigate);
  }

  return status;
};

export const GetBusinessScore = async (navigate, id) => {
  let data = [];

  try {
    const response = await apiConnector(
      "GET",
      UserReviewEndPoints.LISTING_SCORE + `?id=${id}`,
      { ...data }
    );

    if (response.status === 200) {
      data = response.data;
    }
  } catch (error) {
    userErrorAuthHandler(error, navigate);
  }

  return data;
};
