import { apiConnector } from "../axiosConnector";
import { BASEROUTE } from "../../utils/constants";
import { toast } from "sonner";

const responseHanlder = async (
  method: string,
  url: string,
  body?: object,
  loading: boolean = false,
  header?: object
): Promise<[] | object> => {
  let data: object | [] = [];

  let processing;

  if (loading) {
    processing = toast("processing...");
  }

  try {
    const response = await apiConnector(method, url, body, header);
    data = response.data;
  } catch (error: any) {
    if (error.response.data.message) {
      if (error.response.status === 401 && !url.includes("signin")) {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
        localStorage.setItem(
          "authStore",
          JSON.stringify({ state: { userToken: null, userData: {} } })
        );
        window.location.href = BASEROUTE + "/sign-in";
      } else {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
      }
    }
  }

  toast.dismiss(processing);

  return data;
};
export default responseHanlder;
