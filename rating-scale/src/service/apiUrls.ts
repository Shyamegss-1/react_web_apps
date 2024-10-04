const BASE_URL: string =
  import.meta.env.MODE === "development"
    ? "http://localhost:8008/api/v1"
    : "https://rating-scale.vercel.app/api/v1";

export const userApis: { [key: string]: string } = {
  signup: BASE_URL + "/auth/signup",
  signin: BASE_URL + "/auth/signin",
  reviewStats: BASE_URL + "/user/review-stats",
  userDetails: BASE_URL + "/user",
  userReviews: BASE_URL + "/user/reviews",
  updatePassword: BASE_URL + "/user/updatepassword",
};

export const contentApis: { [key: string]: string } = {
  blog: BASE_URL + "/blog",
};

export const companyApis: { [key: string]: string } = {
  listCompany: BASE_URL + "/listing",
  category: BASE_URL + "/listing/category",
  searchCompany: BASE_URL + "/listing/search-q",
  searchCompanyKey: BASE_URL + "/listing/search-x",
  topCategory: BASE_URL + "/listing/getTopCategory",
  getListingReviews: BASE_URL + "/listing/review",
  getListingSubStatus: BASE_URL + "/listing/listing_m_details",
  getListingMedia: BASE_URL + "/listing/media/",
  getListingByCategory: BASE_URL + "/listing/search/",
  getRecentAdded: BASE_URL + "/listing/recently-added",
  getRecentAddedReviews: BASE_URL + "/listing/recently-added-review",
  getAdvertisment: BASE_URL + "/listing/advertisment/",
};

export const reviewApis: { [key: string]: string } = {
  reportReviews: BASE_URL + "/review/report",
};
