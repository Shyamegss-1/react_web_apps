import { create } from "zustand";
import { UserSignUp, UserSignin } from "../service/opreations/authApis";
import { customToast } from "../utils/customToast";
import { UserDetailApi } from "../service/opreations/userDetailsApi";
import { checkuserSubscription } from "../service/opreations/advertismentApi";

import { routes } from "../constants/router-path";

const store = (set) => ({
  response: {
    status: "",
    message: "",
  },
  userToken: localStorage?.getItem("error_log"),
  userDetails: {},
  subscripption: {},
  signUpHandler: async (state) => {
    try {
      const data = await UserSignUp(state);

      if (data.status === 201 || data.status === 401) {
        if (data.status === 201) {
          customToast(data.message, "success");
          set({ response: data });
        } else {
          set({ response: data });
        }
      } else {
        set({
          response: {
            status: 404,
            message: "invalid code",
          },
        });
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      set({
        response: {
          status: 500,
          message: "Internal server error",
        },
      });
    }
  },
  loginHandler: async (state, navigate) => {
    const data = await UserSignin(state);

    if (data.status === 200) {
      set({ userToken: data.token });
      localStorage.setItem("error_log", data.token);
      customToast("login successfully", "success");
      navigate(routes.DASHBOARD);
    }
  },
  userDetailhandler: async (token, navigate) => {
    const data = await UserDetailApi(token, navigate);

    set({ userDetails: data });

    const resa = await checkuserSubscription(token);

    set({ subscripption: resa });
  },
});

const AuthStore = create(store);

export default AuthStore;
