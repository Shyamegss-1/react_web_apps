import { useState } from "react";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import useAuthStore from "../../store/authStore";
import { UPDATEUSERPASSWORD } from "../../service/operations/userOperations";

import { userApis } from "../../service/apiUrls";
import axios from "axios";

export default function UserPasswordUpdate() {
  const token: string = useAuthStore((state) => state.userToken)!;

  const [stateObject, setStateObject] = useState({
    value1: false,
    value2: false,
    value3: false,
  });

  const toggleValue = (key: string) => {
    setStateObject((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const passwordUpdateHandler = async (event) => {
    if (event.newpassword === event.confirmpassword) {
      try {
        const data = await axios.put(
          userApis.updatePassword,
          {
            password: event.password,
            newpassword: event.newpassword,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("password updated successfully");
        reset();
      } catch (error) {
        if (error && error.response.request.status === 401) {
          toast.error("Incorrect password");
        }
      }
    } else {
      toast.error("Password and confirm password does'nt match");
    }
  };

  return (
    <form
      className="my-2"
      style={{ background: "white" }}
      onSubmit={handleSubmit(passwordUpdateHandler)}
    >
      <h3>Change Password</h3>

      <div className="row g-3">
        <div className="col-md-8 position-relative">
          <label htmlFor="your-name" className="form-label">
            current Password
          </label>

          <input
            {...register("password", { required: "This Field is required" })}
            type={!stateObject.value1 ? "password" : "text"}
            className={`form-control ${
              errors.password && "danger-input-border"
            }`}
          />

          <span
            onClick={() => toggleValue("value1")}
            className="position-absolute"
            style={{ top: 37, right: 15, cursor: "pointer" }}
          >
            <i
              className={`fa ${
                !stateObject.value1 ? "fa-eye" : "fa-eye-slash"
              }`}
              aria-hidden="true"
            ></i>
          </span>

          {errors.password && (
            <div className="text-danger danger-input-text">
              {errors.password.message}
            </div>
          )}
        </div>

        <div className="col-md-8 position-relative">
          <label for="your-email" className="form-label">
            New password
          </label>

          <input
            {...register("newpassword", {
              required: "This Field is required",
            })}
            type={!stateObject.value2 ? "password" : "text"}
            className={`form-control ${
              errors.newpassword && "danger-input-border"
            }`}
          />

          <span
            onClick={() => toggleValue("value2")}
            className="position-absolute"
            style={{ top: 37, right: 15, cursor: "pointer" }}
          >
            <i
              className={`fa ${
                !stateObject.value2 ? "fa-eye" : "fa-eye-slash"
              }`}
              aria-hidden="true"
            ></i>
          </span>

          {errors.newpassword && (
            <div className="text-danger danger-input-text">
              {errors.newpassword.message}
            </div>
          )}
        </div>

        <div className="col-md-8 position-relative">
          <label for="your-subject" className="form-label">
            confirm password
          </label>

          <input
            {...register("confirmpassword", {
              required: "This Field is required",
            })}
            type={!stateObject.value3 ? "password" : "text"}
            className={`form-control ${
              errors.confirmpassword && "danger-input-border"
            }`}
          />

          <span
            onClick={() => toggleValue("value3")}
            className="position-absolute"
            style={{ top: 37, right: 15, cursor: "pointer" }}
          >
            <i
              className={`fa ${
                !stateObject.value3 ? "fa-eye" : "fa-eye-slash"
              }`}
              aria-hidden="true"
            ></i>
          </span>

          {errors.confirmpassword && (
            <div className="text-danger danger-input-text">
              {errors.confirmpassword.message}
            </div>
          )}
        </div>

        <div className="col-12">
          <div className="row">
            <div className="col-md-8">
              <button type="submit" className="btn btn-cyan w-100 fw-bold">
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
