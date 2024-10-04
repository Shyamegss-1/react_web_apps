const BASE_URL = "https://eglobal-admin.vercel.app/api/v1";
const isProd =
  import.meta.env.MODE === "development"
    ? "http://localhost:8000/api/v1"
    : "https://reviewsix.vercel.app/api/v1";

const DEV_URL = isProd;
// AUTH ENDPOINTS
export const endpoints = {
  LOGIN_API: BASE_URL + "/auth",
};

export const contentEndpoints = {
  JOBS: BASE_URL + "/content/job-post",
  STATS: DEV_URL + "/admin/size-collec",
  REVIEWS: DEV_URL + "/admin/review",
  USER: DEV_URL + "/admin/user",
  LISTING: DEV_URL + "/admin/listing",
  BLOG: DEV_URL + "/admin/blog",
  BLOG_BY_ID: DEV_URL + "/content/blog",
  BLOG_COMMENTS: DEV_URL + "/admin/blog/comment/",
  BULKUPLOAD: DEV_URL + "/admin/bulk",
  BLOG_CATEGORY: DEV_URL + "/content/category/blog/",
  SETTINGS: DEV_URL + "/content/setting",
  BUSINESS_CATEGORY: DEV_URL + "/company/listing/category",
  QUEYCATEGORY: DEV_URL + "/admin/business-category",
  ADDBUSINESS: DEV_URL + "/admin/business",
  BUSINESS_USER: DEV_URL + "/admin/businessUser",
  BUSINESS_USER_DETAILS: DEV_URL + "/admin/businessUser/details/",
  BUSINESS_USER_REVIEWS: DEV_URL + "/admin/businessUser/reviews/",
  BUSINESS_USER_REPORTS: DEV_URL + "/admin/businessUser/reports/",
  BUSINESS_USER_SUBSCRIPTION: DEV_URL + "/admin/businessUser/subscription/",
  SUBSCRIPTION: DEV_URL + "/admin/subscription",
  REVIEW_REPORT: DEV_URL + "/admin/review-report",
};
