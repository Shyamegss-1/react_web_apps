/* eslint-disable react/prop-types */
import { useEffect } from "react";
import InputField from "../../../components/InputField/InputField";
import configStore from "../../../stores/configStore";
import { useForm } from "react-hook-form";
import {
  UpdateUserPassword,
  UpdateUserProfile,
} from "../../../service/opreations/userDetailsApi";
import { useNavigate } from "react-router-dom";
import AuthStore from "../../../stores/authStore";
import { customToast } from "../../../utils/customToast";

export default function UpdateUserDetails({ userData }) {
  const {
    setValue,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const skeletonLoader = configStore((state) => state.skeletonLoader);
  const setSkeletonLoader = configStore((state) => state.setSkeletonLoader);
  const token = AuthStore((state) => state.userToken);
  const userDetailhandler = AuthStore((state) => state.userDetailhandler);

  useEffect(() => {
    setValue("fname", userData.fname);
    setValue("lname", userData.lname);
  }, [userData]);

  const updateHandler = async (event) => {
    setSkeletonLoader(true);

    const status = await UpdateUserProfile(token, navigate, event);

    if (status === 200) {
      customToast("Details Updated Successfully", "success");
      await userDetailhandler(token, navigate);
    }
    setSkeletonLoader(false);
  };

  return (
    <form onSubmit={handleSubmit(updateHandler)} autoComplete="off">
      <div className="space-y-3">
        <div className="">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            First Name
          </label>

          <InputField
            name="fname"
            type="text"
            placeholder="your first name"
            {...register("fname", { required: true })}
            error={errors.fname}
          />
        </div>

        <div className="">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Last Name
          </label>

          <InputField
            name="lname"
            type="text"
            placeholder="your first name"
            {...register("lname", { required: true })}
            error={errors.lname}
          />
        </div>
      </div>

      <div>
        <button
          disabled={skeletonLoader}
          type="submit"
          className="text-white bg-primary-600 hover:bg-primary-700 base-bg font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-5"
        >
          Update profile
        </button>
      </div>
    </form>
  );
}

export const PasswordUpdateFormHandler = () => {
  const skeletonLoader = configStore((state) => state.skeletonLoader);

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const token = AuthStore((state) => state.userToken);
  const userDetails = AuthStore((state) => state.userDetails);
  const setSkeletonLoader = configStore((state) => state.setSkeletonLoader);

  const passwordUpdateHandler = async (event) => {
    setSkeletonLoader(true);
    const status = await UpdateUserPassword(token, navigate, event);

    if (status === 200) {
      customToast("passsword updated successfully", "success");
      reset();
    }
    setSkeletonLoader(false);
  };

  const newpassword = watch("newpassword");

  return (
    <>
      {userDetails.acountType === "regular" ? (
        <form autoComplete="off" onSubmit={handleSubmit(passwordUpdateHandler)}>
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
            <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>

              <InputField
                name="password"
                type="password"
                placeholder="Your current password"
                {...register("password", { required: true })}
                error={errors.password}
              />
            </div>

            <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Your new password
              </label>

              <InputField
                name="newpassword"
                type="password"
                placeholder="Your new password"
                {...register("newpassword", { required: true, minLength: 8 })}
                error={errors.newpassword}
              />

              {errors.newpassword &&
                errors.newpassword.type === "minLength" && (
                  <p className="text-red-600 text-sm mt-1">
                    Password must be at least 8 characters long.
                  </p>
                )}
            </div>

            <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Confirm new password
              </label>

              <InputField
                name="confirmpassword"
                type="password"
                placeholder="Confirm your new password"
                {...register("confirmpassword", {
                  required: true,
                  validate: (value) =>
                    value === newpassword ||
                    "New passwords and confirm password do not match.",
                })}
                error={errors.confirmpassword}
              />

              {errors.confirmpassword && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.confirmpassword.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              disabled={skeletonLoader}
              type="submit"
              className="text-white bg-primary-600 hover:bg-primary-700 base-bg font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-5"
            >
              Update Password
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <h2 className=" text-base font-bold my-8">
            Updating your password is restricted while logged in via your Google
            account.
          </h2>
        </div>
      )}
    </>
  );
};
