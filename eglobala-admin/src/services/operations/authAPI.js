import { toast } from "react-hot-toast";

import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { setLoading, setToken } from "../../reducer/authSlice";

const { LOGIN_API } = endpoints;

// * dispactch makes it a thunk action automaically

export const LoginAdmin = (Details, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN_API, Details);

      if (response.status === 200) {
        dispatch(setToken(response.data.key));
        localStorage.setItem("token", JSON.stringify(response.data.key));
        toast.success("Welcome back! You've logged in successfully.");
        navigate("/admin/");
      } else {
        toast.error("We're sorry, but something went wrong. Please try again.");
      }
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }

    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
};

export const LogoutHandler = (navigate) => {
  localStorage.removeItem("token");
  toast.success("Logged Out");
  navigate("/admin/login");
};
