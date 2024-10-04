import InputField from "../../../components/InputField/InputField";
import { useForm } from "react-hook-form";

import configStore from "../../../stores/configStore";
import AuthStore from "../../../stores/authStore";
import { useEffect, useState } from "react";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { routes } from "../../../constants/router-path";

export default function Index() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const buttonLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user.access_token) {
      setLoader(true);
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then(async (res) => {
          await login(
            {
              email: res.data.email,
              password: res.data.id,
            },
            navigate
          );

          setLoader(false);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const setLoader = configStore((state) => state.setScreenLoader);
  const login = AuthStore((state) => state.loginHandler);

  const formSubmitHandler = async (event) => {
    setLoader(true);
    await login(Object.assign(event), navigate);
    setLoader(false);
  };

  return (
    <div className="grid grid-col-2 grid-flow-col">
      <section className="col-span-2 justify-center items-center base-bg hidden xl:flex">
        <div className=""></div>
      </section>

      <section className="col-span-4">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="/rating-business"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-full h-8 mr-2 "
              src="https://thebusinessrating.com/Logo.png"
              alt="logo"
            />
            {/* <h2 className=" text-2xl font-semibold text-black">Company Logo</h2> */}
          </a>
          <div className="w-full rounded-2xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign in to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(formSubmitHandler)}
                autoComplete="off"
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Your email
                  </label>
                  <InputField
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    {...register("email", { required: true })}
                    error={errors.email}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Password
                  </label>

                  <InputField
                    name="password"
                    type="password"
                    placeholder="************"
                    {...register("password", { required: true })}
                    error={errors.password}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 base-bg focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-slate-900">
                  Don’t have an account yet?{" "}
                  <Link
                    to={routes.SIGNUP}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
              <hr className="my-6 border-gray-300 w-full" />

              <button
                onClick={() => buttonLogin()}
                type="button"
                className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
              >
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    // eslint-disable-next-line react/no-unknown-property
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    className="w-6 h-6"
                    viewBox="0 0 48 48"
                  >
                    <defs>
                      <path
                        id="a"
                        d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                      />
                    </defs>
                    <clipPath id="b">
                      <use xlinkHref="#a" overflow="visible" />
                    </clipPath>
                    <path
                      clipPath="url(#b)"
                      fill="#FBBC05"
                      d="M0 37V11l17 13z"
                    />
                    <path
                      clipPath="url(#b)"
                      fill="#EA4335"
                      d="M0 11l17 13 7-6.1L48 14V0H0z"
                    />
                    <path
                      clipPath="url(#b)"
                      fill="#34A853"
                      d="M0 37l30-23 7.9 1L48 0v48H0z"
                    />
                    <path
                      clipPath="url(#b)"
                      fill="#4285F4"
                      d="M48 48L17 24l-4-3 35-10z"
                    />
                  </svg>
                  <span className="ml-4">Log in with Google</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
