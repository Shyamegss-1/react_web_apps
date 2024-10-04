import { useEffect, useState } from "react";
import InputField from "../../../components/InputField/InputField";
import {
  VerifyUserForPassword,
  enterNewPassword,
} from "../../../service/opreations/authApis";
import { customToast } from "../../../utils/customToast";
import { useNavigate, useParams } from "react-router-dom";
import configStore from "../../../stores/configStore";
import { useForm } from "react-hook-form";

export default function Index() {
  const navigate = useNavigate();
  const { token, id } = useParams();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const [pass, setPass] = useState(false);
  const [confirmPass, setConfirmPass] = useState(false);

  const setLoader = configStore((state) => state.setScreenLoader);
  const isLoading = configStore((state) => state.screenLoader);

  useEffect(() => {
    (async () => {
      setLoader(true);
      const data = await VerifyUserForPassword({ token, id });

      if (data.status === 401) {
        customToast(data.message, "error");
        navigate("/");
      } else if (data.status === 203) {
        customToast("Verification complete! Login to your account", "success");
        navigate("/signin");
      }
      setLoader(false);
    })();
  }, []);

  const submitHandler = async (event) => {
    setLoader(true);

    const data = await enterNewPassword({ password: event.password, id });

    if (data.status === 202) {
      customToast("Signin process complete! Login to your account", "success");
      navigate("/signin");
    }

    setLoader(false);
  };

  const password = watch("password");

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      {!isLoading && (
        <div className="w-full rounded-lg m-auto p-5 shadow dark:border md:mt-0 sm:max-w-md xl:p-0dark:border-gray-700">
          <div className="mx-auto  max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Complete signup!</h1>

            <p className="mt-4 text-gray-500">
              Enter a new passoword and get access to your account
            </p>
          </div>

          <form
            onSubmit={handleSubmit(submitHandler)}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <InputField
                  type={pass ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  {...register("password", { required: true, minLength: 8 })}
                  error={errors.password}
                />

                {errors.password && errors.password.type === "minLength" && (
                  <p className="text-red-600 text-sm mt-1">
                    Password must be at least 8 characters long.
                  </p>
                )}

                <span
                  onClick={() => setPass((state) => !state)}
                  className="absolute inset-y-0 cursor-pointer end-0 grid place-content-center px-4"
                >
                  <i
                    className={`fa ${pass ? "fa-eye-slash" : "fa-eye"}`}
                    aria-hidden="true"
                  ></i>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>

              <div className="relative">
                <InputField
                  type={confirmPass ? "text" : "password"}
                  name="confirmpassword"
                  {...register("confirmpassword", {
                    required: true,
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  error={errors.confirmpassword}
                  placeholder="confirm password"
                />
                <span
                  onClick={() => setConfirmPass((state) => !state)}
                  className="absolute inset-y-0 cursor-pointer end-0 grid place-content-center px-4"
                >
                  <i
                    className={`fa ${confirmPass ? "fa-eye-slash" : "fa-eye"}`}
                    aria-hidden="true"
                  ></i>
                </span>
              </div>
            </div>

            {errors.confirmpassword && (
              <p className="text-red-600 text-sm mt-1">
                {errors.confirmpassword.message}
              </p>
            )}

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 base-bg focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Complete signup
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
