import { Link, useNavigate } from "react-router-dom";
import { BASEROUTE, IMAGEBASE } from "../../../utils/constants";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useForm } from "react-hook-form";
import { USERSIGNUPHANDLER } from "../../../service/operations/userOperations";
import useAuthStore from "../../../store/authStore";

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Index() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();

  const userLoginHandler = useAuthStore((state) => state.signin);

  const submitHandler = async (event: Inputs) => {
    const data: { token: string; data: { user: object } } =
      await USERSIGNUPHANDLER(event);

    if (data.token) {
      navigate(BASEROUTE + "/");
      userLoginHandler(data.token, data.data.user);
    }
  };

  return (
    <div>
      <section className="login-section">
        <div className="row g-lg-0">
          <div className="col-lg-6">
            <div className="d-flex justify-content-center align-items-center login-left">
              <div className="text-center">
                <img
                  src={IMAGEBASE + "/img/Sign-Up.png"}
                  className="img-fluid"
                  alt=""
                />

                <h4 className="mt-5 text-white">
                  Your next favorite thing is here
                </h4>

                <br />

                <Link to="/">
                  <button className="w-100 border more-review">
                    BACK TO HOME PAGE
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="d-flex justify-content-center align-items-center login-right">
              <div className="login-form ">
                <div className="form-title text-center">
                  <h6 className="fw-bold">“Free Sign-up</h6>
                  <h2 className="mt-3">Let's get you signed up</h2>
                  <p className="mt-3">
                    Already a member?{" "}
                    <Link to="/sign-in" style={{ color: "blue" }}>
                      Sign In
                    </Link>
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className="mt-5 needs-validation"
                >
                  <div className="form-field">
                    <label>Please enter your full name</label>
                    <input
                      type="text"
                      placeholder="Full name..."
                      className="form-control"
                      {...register("name", {
                        required: "Please enter your full name.",
                      })}
                    />

                    {errors.name && (
                      <p className="error-p">{errors.name.message}...</p>
                    )}
                  </div>
                  <div className="form-field mt-4">
                    <label>Email address</label>
                    <input
                      type="email"
                      placeholder="Enter your email..."
                      className="form-control"
                      {...register("email", {
                        required: "  Please enter your email address.",
                      })}
                    />

                    {errors.email && (
                      <p className="error-p">{errors.email.message}...</p>
                    )}
                  </div>
                  <div className="form-field mt-4 position-relative">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="......."
                      className="form-control"
                      {...register("password", {
                        required: "  Please enter your password.",
                      })}
                    />{" "}
                    <Icon
                      className="toggle-password"
                      fontSize={24}
                      icon="bitcoin-icons:visible-filled"
                    />
                    {errors.password && (
                      <p className="error-p">{errors.password.message}...</p>
                    )}
                  </div>

                  <div className="form-field mt-4 position-relative">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      placeholder="......."
                      className="form-control"
                      {...register("confirmPassword", {
                        required: "  Please enter your confirm password.",
                      })}
                    />{" "}
                    <Icon
                      className="toggle-password"
                      fontSize={24}
                      icon="bitcoin-icons:visible-filled"
                    />
                    {errors.confirmPassword && (
                      <p className="error-p">
                        {errors.confirmPassword.message}...
                      </p>
                    )}
                  </div>

                  <div className="form-check mt-3 ps-0">
                    <input
                      className=""
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      required
                    />
                    <label
                      htmlFor="flexCheckDefault"
                      className="form-check-label ps-2"
                    >
                      I accept the terms and conditions of the company
                    </label>
                  </div>

                  <div className="form-field mt-5">
                    <button
                      type="submit"
                      name="signupsubmit"
                      className="w-100  more-review"
                    >
                      SIGN IN
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
