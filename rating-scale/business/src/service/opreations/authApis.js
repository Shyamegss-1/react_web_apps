import { customToast } from "../../utils/customToast";
import { apiConnector } from "../apiConnector";
import { AuthEndpoints } from "../apis";

export const UserSignUp = async (data) => {
  let star = {
    status: "",
    message: "",
  };

  try {
    const response = await apiConnector(
      "POST",
      AuthEndpoints.SIGNIN_API,
      { ...data },
      {}
    );

    if (response.status === 201) {
      star.status = 201;
      star.message =
        "We have sent a confirmation message to your email address. Please complete the verification process and set your password.";
    }
  } catch (error) {
    if (error.response.status === 401) {
      star.status = 401;
      star.message = "invalid url";
    } else {
      customToast(error.response.data.message, "error");
    }
  }

  return star;
};

export const UserSignin = async (data) => {
  let star = {
    status: "",
    message: "",
    token: "",
  };

  try {
    const response = await apiConnector(
      "POST",
      AuthEndpoints.LOGIN_API,
      { ...data },
      {}
    );

    if (response.status === 200) {
      star.status = 200;
      star.token = response.data.token;
    }
  } catch (error) {
    star.status = 401;
    customToast(error.response.data.message, "error");
  }

  return star;
};

export const VerifyUserForPassword = async (data) => {
  let star = {
    status: "",
    message: "",
  };

  try {
    const response = await apiConnector(
      "POST",
      AuthEndpoints.VALID_FOR_PASS,
      { ...data },
      {}
    );

    if (response.status === 200) {
      star.status = 200;
      star.message = "verification complete successfully";
    } else if (response.status === 203) {
      star.status = 203;
      star.message = "verification complete successfully";
    }
  } catch (error) {
    if (error.response.status === 401) {
      star.status = 401;
      star.message = "You are unauthorized to access this route";
    } else {
      customToast(error.response.data.message, "error");
    }
  }

  return star;
};

export const enterNewPassword = async (data) => {
  let star = {
    status: "",
    message: "",
  };

  try {
    const response = await apiConnector(
      "PUT",
      AuthEndpoints.VALID_FOR_PASS,
      { ...data },
      {}
    );

    if (response.status === 202) {
      star.status = 202;
      star.message = "Sign-up process finished";
    }
  } catch (error) {
    if (error.response.status === 401) {
      star.status = 401;
      star.message = "You are unauthorized to access this route";
    } else {
      customToast(error.response.data.message, "error");
    }
  }

  return star;
};

export const LogoutHandler = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("webreviw-ery");
  customToast("Logged Out", "success");
  window.location.href = "/signin";
  localStorage.removeItem("error_log");
};

export const userErrorAuthHandler = (error, navigate) => {
  console.log(error);

  if (error.response.status === 401) {
    if (error.response.data.message) {
      customToast(error.response.data.message, "error");
    }
    LogoutHandler(navigate);
  } else {
    if (error.response.data.message) {
      customToast(error.response.data.message, "error");
    }
  }
};
