import React, { useState } from "react";

import { Rating } from "react-simple-star-rating";
import { useForm } from "react-hook-form";
import useAuthStore from "../../../store/authStore";
import { POSTREVIEWS } from "../../../service/operations/companyOperations";
import { toast } from "sonner";
import { useBackdropLoader } from "../../../components/backdropLoader/backdropLoader";
import PopupPortal from "../../../components/portal/popupPortal";
import {
  USERSIGNINHANDLER,
  USERSIGNUPHANDLER,
} from "../../../service/operations/userOperations";

interface PostReviewModalProps {
  reviewModal: boolean;
  closeHandler?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  state: object;
}

type formInputs = {
  review: string;
  title: string;
  date: string | Date;
};

function toISODateTime(date: Date | string) {
  if (
    typeof date === "string" &&
    date.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/)
  ) {
    return date;
  }
  const dateObj = new Date(date);
  const isoDateTimeString = dateObj.toISOString();

  return isoDateTimeString;
}

function removeBacklinksAndWebsites(text: string) {
  const withoutHyperlinks = text.replace(/<a\b[^>]*>(.*?)<\/a>/gi, "");
  const withoutWebsites = withoutHyperlinks.replace(
    /(http:\/\/|www\.)\S+/gi,
    ""
  );

  return withoutWebsites;
}

const PostReviewModal: React.FC<PostReviewModalProps> = ({
  closeHandler,
  state,
}: PostReviewModalProps): React.ReactElement => {
  const [rating, setRating] = useState<number>(1);
  const [modal, setModal] = useState<boolean>(false);
  const { name, email } = useAuthStore((state) => state.userData);
  const token = useAuthStore((state) => state.userToken)!;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formInputs>();

  const { startLoading, closeLoading } = useBackdropLoader();

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const submitHandler = async (event: formInputs) => {
    startLoading();
    const d = {
      listingId: state.details ? state.details[0]?.id : "",
      name: name,
      email: email,
      title: removeBacklinksAndWebsites(event.title),
      review: removeBacklinksAndWebsites(event.review),
      rating: rating,
      date: toISODateTime(event.date),
      matrix: state.id,
    };

    if (token) {
      const response = await POSTREVIEWS(d, token);

      if (response.status === 201) {
        toast.success("your review is under moderation");
      }
      reset();
    } else {
      setModal(true);
      sessionStorage.setItem("temp-r", JSON.stringify(d));
      reset();
    }

    if (closeHandler) {
      closeHandler(false);
    }

    closeLoading();
  };

  const modalClose = () => {
    setModal(false);
  };

  return (
    <>
      <div className="review-new-form-box mb-5" id="review-new-form-box">
        <div>
          <h4 className="mb-1">Write A Review</h4>
        </div>
        <form onSubmit={handleSubmit(submitHandler)} className="mt-4">
          <div className="row">
            <div className="col-lg-5">
              <div className="form-field">
                <label htmlFor="">Ratings*</label>
                <div className="listing-ratings-stars">
                  <Rating initialValue={rating} onClick={handleRating} />
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="form-field">
                <label htmlFor="">Date Of Experience</label>
                <input
                  type="date"
                  id="date"
                  className={`form-control ${
                    errors.date && "danger-input-border"
                  }`}
                  {...register("date", {
                    required: "This Field is required",
                  })}
                />
                {errors.date && (
                  <div className="text-danger danger-input-text">
                    {errors.date.message}
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-12 mt-4">
              <div className="form-field">
                <label htmlFor="">Review Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="Good Experience"
                  className={`form-control ${
                    errors.title && "danger-input-border"
                  }`}
                  {...register("title", {
                    required: "This Field is required",
                  })}
                />
                {errors.title && (
                  <div className="text-danger danger-input-text">
                    {errors.title.message}
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-12 mt-4">
              <div className="form-field">
                <label htmlFor="">
                  Please let us know about your experience with the
                  company/software*
                </label>
                <textarea
                  id="textInput"
                  placeholder="Enter the review description here..."
                  rows={5}
                  className={`form-control ${
                    errors.review && "danger-input-border"
                  }`}
                  {...register("review", {
                    required: "This Field is required",
                  })}
                />
                {errors.review && (
                  <div className="text-danger danger-input-text">
                    {errors.review.message}
                  </div>
                )}
              </div>
            </div>
            <div className="col-lg-12 mt-4">
              <div className="form-field">
                <button className="theme-btn1 w-100" id="review_submit2">
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <PopupPortal isOpen={modal} onClose={modalClose}>
        <SignInPopUp closeHandler={modalClose} />
      </PopupPortal>
    </>
  );
};

interface signinForm {
  email: string;
  password: string;
  name: string;
  cpassword: string;
}

const SignInPopUp = ({ closeHandler }: { closeHandler: () => void }) => {
  const [modal, setModal] = useState<boolean>(true);

  const { startLoading, closeLoading } = useBackdropLoader();

  const userLoginHandler = useAuthStore((state) => state.signin);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<signinForm>();

  const submitHanlder = async (event: signinForm) => {
    let data: { token: string; data: { user: object } };

    if (modal) {
      data = await USERSIGNINHANDLER(event);
    } else {
      data = await USERSIGNUPHANDLER(event);
    }

    if (data.token) {
      startLoading();

      closeHandler();
      userLoginHandler(data.token, data.data.user);
      const reviewData = JSON.parse(sessionStorage.getItem("temp-r")!);

      reviewData.name = data.data.user.name;
      reviewData.email = data.data.user.email;

      const response = await POSTREVIEWS(reviewData, data.token);

      if (response.status === 201) {
        closeLoading();
        toast.success("your review is under moderation");
      }
      reset();
    }
  };

  return (
    <div className="login-signup-modal" style={{ display: "block" }}>
      <div onClick={closeHandler} className="loginmodal-close-btn ">
        <span>X</span>
      </div>

      <div className="login-signup-form-btn">
        <button
          className={`form-login-btn ${modal && "active-form-btn"}`}
          onClick={() => setModal(true)}
        >
          Sign In
        </button>
        <button
          className={`form-login-btn ${!modal && "active-form-btn"}`}
          onClick={() => setModal(false)}
        >
          Sign Up
        </button>
      </div>

      {modal && (
        <div className="sign-in-form">
          <form onSubmit={handleSubmit(submitHanlder)}>
            <div className="form-field mb-3">
              <label htmlFor="">Email Address*</label>
              <input
                type="email"
                placeholder="info@example.com"
                className={`form-control ${
                  errors.email && "danger-input-border"
                }`}
                {...register("email", {
                  required: "This Field is required",
                })}
              />
            </div>
            <div className="form-field mb-1">
              <label htmlFor="">Password*</label>
              <input
                type="password"
                placeholder="********"
                className={`form-control ${
                  errors.password && "danger-input-border"
                }`}
                {...register("password", {
                  required: "This Field is required",
                })}
              />
            </div>
            <div className="form-field mb-3">
              <small>
                Forgot Password? <a href="###">Reset</a>
              </small>
            </div>
            <div className="form-field mb-2">
              <button
                className="theme-btn1 w-100 signin-smt-btn"
                type="submit"
                name="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      )}

      {!modal && (
        <div className="sign-up-form">
          <form onSubmit={handleSubmit(submitHanlder)}>
            <div className="form-field mb-3">
              <label htmlFor="">Full Name*</label>
              <input
                type="text"
                id="username"
                placeholder="Kindly enter your full name"
                className={`form-control ${
                  errors.name && "danger-input-border"
                }`}
                {...register("name", {
                  required: "This Field is required",
                })}
              />
            </div>
            <div className="form-field mb-1">
              <label htmlFor="">Email Address*</label>
              <input
                type="email"
                id="email1"
                placeholder="Email Address"
                className={`form-control ${
                  errors.email && "danger-input-border"
                }`}
                {...register("email", {
                  required: "This Field is required",
                })}
              />
            </div>
            <div className="form-field mb-1">
              <label htmlFor="">Password*</label>
              <input
                type="password"
                id="password1"
                className={`form-control ${
                  errors.password && "danger-input-border"
                }`}
                {...register("password", {
                  required: "This Field is required",
                })}
              />
            </div>
            <div className="form-field mb-3">
              <label htmlFor="">Confirm Password*</label>
              <input
                type="password"
                id="cpassword1"
                className={`form-control ${
                  errors.cpassword && "danger-input-border"
                }`}
                {...register("cpassword", {
                  required: "This Field is required",
                })}
              />
            </div>
            <div className="form-field mb-2">
              <button
                className="theme-btn1 w-100 signup-smt-btn more-review"
                id="submit"
                type="submit"
                name="submitnew"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostReviewModal;
