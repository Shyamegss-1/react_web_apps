const BASE_URL = "https://eglobal-admin.vercel.app/api/v1";

// AUTH ENDPOINTS
export const endpoints = {
  LOGIN_API: BASE_URL + "/auth",
};

export const contentEndpoints = {
  DEPARTMENT: BASE_URL + "/content/department",
  JOBS: BASE_URL + "/content/job-post",
  SUBCATEGORY: BASE_URL + "/content/subcategory",
  VISITORS: BASE_URL + "/content/carrer",
  SETTING: BASE_URL + "/content/setting",
};
