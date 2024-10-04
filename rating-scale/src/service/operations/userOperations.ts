import { userApis } from "../apiUrls";
import responseHanlder from "./apiUtils";

export const USERSIGNUPHANDLER = async (
  body?: object
): Promise<object | []> => {
  return await responseHanlder("POST", userApis.signup, body, true);
};

export const USERSIGNINHANDLER = async (
  body?: object
): Promise<object | []> => {
  return await responseHanlder("POST", userApis.signin, body, true);
};

export const USERREVIEWSTATS = async (token: string): Promise<object | []> => {
  return await responseHanlder("GET", userApis.reviewStats, {}, false, {
    authorization: `Bearer ${token}`,
  });
};

export const GETUSERDETAILS = async (token: string): Promise<object | []> => {
  return await responseHanlder("GET", userApis.userDetails, {}, false, {
    authorization: `Bearer ${token}`,
  });
};

export const UPDATEUSERDETAILS = async (
  token: string,
  body: object
): Promise<object | []> => {
  return await responseHanlder(
    "POST",
    userApis.userDetails,
    { ...body },
    false,
    {
      authorization: `Bearer ${token}`,
    }
  );
};

export const GETUSERREVIEWS = async (
  token: string,
  query: string,
  filter: string
): Promise<object | []> => {
  return await responseHanlder(
    "GET",
    userApis.userReviews + query + filter,
    {},
    false,
    {
      authorization: `Bearer ${token}`,
    }
  );
};

export const UPDATEUSERPASSWORD = async (
  token: string,
  object: object
): Promise<object | []> => {
  console.log(token);

  return await responseHanlder(
    "PUT",
    userApis.updatePassword,
    { ...object },
    false,
    {
      authorization: `Bearer ${token}`,
    }
  );
};
