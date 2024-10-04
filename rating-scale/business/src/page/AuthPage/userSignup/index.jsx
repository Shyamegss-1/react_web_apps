import { useEffect, useState } from "react";
import InputField from "../../../components/InputField/InputField";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useForm } from "react-hook-form";

import configStore from "../../../stores/configStore";
import AuthStore from "../../../stores/authStore";

import { PhoneInput } from "react-international-phone";
import { routes } from "../../../constants/router-path";
import { Link } from "react-router-dom";

export default function Index() {
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState(false);
  const [static_code, setStatic_code] = useState(null);

  const [phone, setPhone] = useState(0);

  const [restWebsite, setRestWebsite] = useState(null);

  // const [va, setVa] = useState("");

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const setLoader = configStore((state) => state.setScreenLoader);
  const signUp = AuthStore((state) => state.signUpHandler);
  const response = AuthStore((state) => state.response);

  const login = useGoogleLogin({
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
        .then((res) => {
          setLoader(false);
          setStatic_code(res.data.id);
          setValue("fname", res.data.given_name);
          setValue("lname", res.data.family_name);
          setValue("email", res.data.email);

          setProfile(true);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const submitHandler = async (event) => {
    if (phone.length > 5) {
      setLoader(true);

      event.email = !profile
        ? event.email.split("@")[0] + `@${restWebsite.rest}`
        : event.email;

      await signUp({
        ...event,
        static_code,
        acountType: profile ? "gmail" : "regular",
      });

      setLoader(false);
    } else {
      alert("enter a valid phone number");
    }
  };

  const removeProfileData = () => {
    setProfile(false);
    setUser({});
    setValue("fname", "");
    setValue("lname", "");
    setValue("email", "");
  };

  const website = getValues("website");

  function separateUrlParts(url) {
    const regex = /^(https:\/\/)?(www\.)?(.+)$/;

    const match = url.match(regex);

    if (match) {
      const httpsPart = match[1] || "";
      const wwwPart = match[2] || "";
      const restPart = match[3];

      return {
        https: httpsPart,
        www: wwwPart,
        rest: restPart,
      };
    } else {
      return {
        error: "Invalid URL format",
      };
    }
  }

  useEffect(() => {
    let k = separateUrlParts(website ?? "");
    setRestWebsite(k);
  }, [website]);

  return (
    <div className="grid grid-col-2 grid-flow-col relative h-screen overflow-hidden">
      <section className="col-span-2 justify-center items-center base-bg hidden lg:flex">
        <div className=""></div>
      </section>

      <section className="col-span-4 h-screen overflow-y-scroll py-20 px-0">
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
              {response.status && response.status === 401 && (
                <div className="bg-red-200 my-5 px-4 py-3 rounded-md">
                  <p className="text-sm font-medium text-gray-700">
                    Looks like the website can’t be reached or doesn’t exist.
                    Please try a different website.
                  </p>
                </div>
              )}

              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create a free account
              </h1>

              <div className="relative">
                <button
                  disabled={profile}
                  onClick={() => login()}
                  type="button"
                  className="w-full block bg-white  hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300 disabled:bg-gray-300 disabled:text-slate-400"
                >
                  <ButtonGoogleSignUp />
                </button>
                {profile && (
                  <span
                    onClick={removeProfileData}
                    className="absolute -top-4 -right-3 p-2 cursor-pointer"
                  >
                    <i className="fa fa-times-circle" aria-hidden="true"></i>
                  </span>
                )}
              </div>

              <hr className="my-6 border-gray-300 w-full" />

              <form
                className="space-y-4 md:space-y-3"
                onSubmit={handleSubmit(submitHandler)}
                autoComplete="off"
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Website
                  </label>

                  <InputField
                    name="website"
                    placeholder="https://example.com"
                    {...register("website", {
                      required: true,
                      // onChange: (e) => setVa(e.target.value),
                    })}
                    error={errors.website}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Company Name
                  </label>

                  <InputField
                    name="companyname"
                    placeholder="Your company name"
                    {...register("companyname", { required: true })}
                    error={errors.companyname}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    First Name
                  </label>

                  <InputField
                    disabled={profile}
                    type="text"
                    name="fname"
                    placeholder="First Name"
                    {...register("fname", { required: true })}
                    error={errors.fname}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Last Name
                  </label>

                  <InputField
                    disabled={profile}
                    name="lname"
                    placeholder="Last Name"
                    {...register("lname", { required: true })}
                    error={errors.lname}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Job Title
                  </label>

                  <InputField
                    type="text"
                    name="jobtitle"
                    placeholder="Job Title"
                    {...register("jobtitle", { required: true })}
                    error={errors.jobtitle}
                  />
                </div>

                <div className=" relative">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Work Email
                  </label>

                  <div className="flex">
                    <InputField
                      type="text"
                      disabled={profile}
                      name="workemail"
                      placeholder="email@example.com"
                      {...register("email", { required: true })}
                      error={errors.email}
                    />

                    {!profile &&
                      restWebsite?.rest &&
                      restWebsite?.rest?.includes(".") && (
                        <div className="bg-gray-200 py-2.5 px-4 rounded-e-md rounded ">
                          <p>@{restWebsite?.rest}</p>
                        </div>
                      )}
                  </div>
                </div>

                <div className="">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Phone Number
                  </label>

                  <PhoneInput
                    defaultCountry="usa"
                    inputClassName="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none"
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                  />

                  {/* <InputField
                    type="phone"
                    name="phonenumber"
                    placeholder="+1 90291 029321"
                    {...register("phone", { required: true })}
                    error={errors.phone}
                  /> */}
                </div>

                <p className="text-sm py-3 font-light text-slate-900">
                  Already have an account ?{" "}
                  <Link
                    to={routes.SIGNIN}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    sign in
                  </Link>
                </p>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 base-bg focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-5"
                >
                  Create free account
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const ButtonGoogleSignUp = () => (
  <div className="flex items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // eslint-disable-next-line react/no-unknown-property
      xmlnsXlink="http://www.w3.org/1999/xlink"
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
      <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
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
      <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
    </svg>
    <span className="ml-4">Sign up with Google</span>
  </div>
);
