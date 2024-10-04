import { reviewApis } from "../apiUrls";
import responseHanlder from "./apiUtils";

export const REPORTREVIEW = async (
  object: object,
  token: string
): Promise<object | []> => {
  return await responseHanlder(
    "POST",
    reviewApis.reportReviews,
    { ...object },
    true,
    {
      authorization: `Bearer ${token}`,
    }
  );
};
