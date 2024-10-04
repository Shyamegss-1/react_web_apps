import { useForm } from "react-hook-form";
import { BASEROUTE, IMAGEBASE } from "../../../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { USERSIGNINHANDLER } from "../../../service/operations/userOperations";
import useAuthStore from "../../../store/authStore";
import { toast } from "sonner";

type Inputs = {
  email: string;
  password: string;
};

export default function Index() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const userLoginHandler = useAuthStore((state) => state.signin);

  const navigate = useNavigate();

  const signinHander = async (event: Inputs) => {
    const data: { token: string; data: { user: object } } =
      await USERSIGNINHANDLER(event);

    if (data.token) {
      userLoginHandler(data.token, data.data.user);

      navigate(BASEROUTE + "/");

      toast.success("Login successful.");
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
                  src={IMAGEBASE + "/img/sbanner4.png"}
                  className="img-fluid"
                  alt=""
                />
                <h4 className="mt-5 text-white">
                  Your next favorite thing is here
                </h4>
                <br />
                <a href="index-2.html">
                  <button className="w-100  border  more-review">
                    BACK TO HOME PAGE
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="d-flex justify-content-center align-items-center login-right">
              <div className="login-form ">
                <div className="form-title text-center">
                  <h6 className="fw-bold">Sign In</h6>
                  <h2 className="mt-3">Sign in to your account</h2>
                  <p className="mt-3">
                    Not a member?{" "}
                    <Link
                      to={BASEROUTE + "/sign-up"}
                      style={{ color: "blue;" }}
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
                <form onSubmit={handleSubmit(signinHander)} className="mt-5">
                  <div className="form-field">
                    <label>Email address</label>
                    <input
                      type="email"
                      placeholder="Enter your email..."
                      className="form-control"
                      {...register("email", {
                        required: "Please enter your email address.",
                      })}
                    />

                    {errors.email && (
                      <p className="error-p">{errors.email.message}...</p>
                    )}
                  </div>
                  <div
                    className="form-field mt-4"
                    style={{ position: "relative" }}
                  >
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="......."
                      className="form-control"
                      {...register("password", {
                        required: "  Please enter your password",
                      })}
                    />

                    {errors.password && (
                      <p className="error-p">{errors.password.message}...</p>
                    )}
                  </div>

                  <div className="form-field mt-5">
                    <button
                      type="submit"
                      name="loginsubmit"
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
