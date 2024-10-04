import { companyApis } from "../apiUrls";
import responseHanlder from "./apiUtils";

export const GETCOMPANYCATEGORY = async (
  page: string,
  filter: string
): Promise<object | []> => {
  return await responseHanlder("GET", companyApis.category + page + filter);
};

export const GETTOPCOMPANYCATEGORY = async (): Promise<object | []> => {
  return await responseHanlder("GET", companyApis.topCategory);
};

export const SEARCHCOMPANY = async (query: string): Promise<object | []> => {
  return await responseHanlder(
    "GET",
    companyApis.searchCompany + `?query=${query}`
  );
};

export const SEARCHCOMPANYBYKEY = async (
  query: string
): Promise<object | []> => {
  return await responseHanlder(
    "GET",
    companyApis.searchCompanyKey + `/${query}`
  );
};

export const LISTCOMPANY = async (body: {
  websiteLink: string;
}): Promise<object | []> => {
  return await responseHanlder("PUT", companyApis.listCompany, body);
};

export const GETREVIEWS = async (
  id: string,
  page: string
): Promise<object | []> => {
  return await responseHanlder(
    "GET",
    companyApis.getListingReviews + `?id=${id}&&page=${page ?? 1}`
  );
};

export const POSTREVIEWS = async (
  object: object,
  token: string
): Promise<object | []> => {
  return await responseHanlder(
    "PUT",
    companyApis.getListingReviews,
    { ...object },
    true,
    {
      authorization: `Bearer ${token}`,
    }
  );
};

export const GETLISTINGPUURCHSESTATUS = async (
  object: object
): Promise<object | []> => {
  return await responseHanlder("POST", companyApis.getListingSubStatus, {
    ...object,
  });
};

export const GETLISTINGMEDIA = async (id: string): Promise<object | []> => {
  return await responseHanlder("GET", companyApis.getListingMedia + id);
};

export const GETLISTINGBYCATEGORY = async (
  id: string
): Promise<object | []> => {
  return await responseHanlder("GET", companyApis.getListingByCategory + id);
};

export const GETRECENTADDED = async (): Promise<object | []> => {
  return await responseHanlder("GET", companyApis.getRecentAdded);
};
export const GETRECENTADDEDREVIEW = async (): Promise<object | []> => {
  return await responseHanlder("GET", companyApis.getRecentAddedReviews);
};

export const GETADVERTISMENT = async (id: string): Promise<object | []> => {
  return await responseHanlder("GET", companyApis.getAdvertisment + id);
};
