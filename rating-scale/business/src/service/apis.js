const isProd =
  import.meta.env.MODE === "development"
    ? "http://localhost:8008/api/v1/business"
    : "https://rating-scale.vercel.app/api/v1/business";

const BASE_URL = isProd;

// AUTH ENDPOINTS
export const AuthEndpoints = {
  LOGIN_API: BASE_URL + "/signin",
  SIGNIN_API: BASE_URL + "/signup",
  VALID_FOR_PASS: BASE_URL + "/check-valid-pass",
};

export const UserDetailEndPoints = {
  DETAILS: BASE_URL + "/user",
  UPDATE_PASSWORD: BASE_URL + "/user/updatePassword",
  LISTING_CATEGORY: BASE_URL + "/category",
  USER_CONTACTS: BASE_URL + "/user/contact",
};

export const UserReviewEndPoints = {
  STATS: BASE_URL + "/review/stats",
  REVIEWS: BASE_URL + "/review",
  REPORTS: BASE_URL + "/report",
  LISTING_SCORE: BASE_URL + "/score/",
};

export const AdvertismentEndPoints = {
  AD_BASE: BASE_URL + "/advertisement",
  MEDIA_BASE: BASE_URL + "/media",
  SUBSCRIPTION: BASE_URL + "/subscription",
  SUBSCRIPTION_DETAILS: BASE_URL + "/subscription/details",
  SUBSCRIPTION_HISTORY: BASE_URL + "/subscription/history",
};
