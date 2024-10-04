import { contentApis } from "../apiUrls";
import responseHanlder from "./apiUtils";

export const GETBLOGHANDLER = async (): Promise<object | []> => {
  return await responseHanlder("GET", contentApis.blog);
};
