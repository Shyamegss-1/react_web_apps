/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import {
  UserReviewReply,
  UserReviews,
} from "../../../../service/opreations/reviewDetailsApi";
import AuthStore from "../../../../stores/authStore";
import { Link, useNavigate } from "react-router-dom";
// import ReviewStats from "../reviewStats";
// import configStore from "../../../../stores/configStore";
import { dateFormater } from "../../../../utils/helpers";

import { routes } from "../../../../constants/router-path";
import { customToast } from "../../../../utils/customToast";
import { UpDownArrow } from "../../../../components/icons/customIcons";

export default function Index() {
  const navigate = useNavigate();
  const token = AuthStore((state) => state.userToken);

  // const setSkeletonLoader = configStore((state) => state.setSkeletonLoader);
  // const skeletonLoader = configStore((state) => state.skeletonLoader);

  // state

  const [reviews, setReview] = useState([]);

  const [tableLoader, setTableLoader] = useState(false);
  const [total, setTotal] = useState(1);

  const [page, setPage] = useState(1);

  const [openId, setOpenId] = useState(0);

  const [activeReply, setActiveReply] = useState(0);

  const filter = new URLSearchParams(location.search).get("filter");

  const [count, setCount] = useState(1);

  // ()=>

  useEffect(() => {
    const url = new URL(location.href);
    (async () => {
      setTableLoader(true);
      const reresult = await UserReviews(token, navigate, url.search);
      setReview(reresult?.reviews);
      setTotal(reresult?.total ?? 1);
      setTableLoader(false);
    })();
  }, [page, count]);

  const filterHandler = async (event) => {
    setTableLoader(true);
    const url = new URL(location.href);
    const searchParams = new URLSearchParams(url.search);

    searchParams.set("filter", event);

    url.search = searchParams.toString();

    history.pushState({}, "", url);

    try {
      const result = await UserReviews(token, navigate, url.search);
      setReview(result?.reviews);
      setTotal(result?.total ?? 1);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }

    setTableLoader(false);
  };

  const openHandler = (index) => {
    if (openId === index) setOpenId(0);
    else setOpenId(index);
  };

  const pageHandler = (yehhh) => {
    setPage(yehhh);

    const url = new URL(location.href);
    const searchParams = new URLSearchParams(url.search);
    searchParams.set("page", yehhh);
    url.search = searchParams.toString();
    history.pushState({}, "", url);
  };

  const filterResetHandler = async () => {
    setTableLoader(true);
    const url = new URL(location.href);
    const searchParams = new URLSearchParams(url.search);

    searchParams.delete("filter");
    searchParams.delete("page");

    url.search = searchParams.toString();
    window.history.replaceState(null, "", url.toString());
    setPage(1);

    const result = await UserReviews(token, navigate, url.search);
    setReview(result?.reviews);
    setTotal(result?.total ?? 1);

    setTableLoader(false);
  };

  const replySubmitHandler = async (index) => {
    setTableLoader(true);
    const data = await UserReviewReply(token, navigate, {
      reply: reviews[index - 1].reply,
      id: reviews[index - 1].id,
    });

    if (data === 200) {
      customToast("Reply send successfully", "success");
    }

    setTableLoader(false);
  };

  const replyTextUpdateHandler = (event, index) => {
    let newState = [...reviews];
    newState[index - 1].reply = event.target.value;

    setReview(newState);
  };

  const sortHandler = () => {};

  const ratingHandler = (e) => {
    const value = e.target.value;

    if (value !== "6") {
      console.log(value);
      const url = new URL(location.href);
      const searchParams = new URLSearchParams(url.search);
      searchParams.set("r", +value);
      url.search = searchParams.toString();
      history.pushState({}, "", url);

      setCount((state) => state + 1);
    } else {
      console.log("r");
      const url = new URL(location.href);
      const searchParams = new URLSearchParams(url.search);

      searchParams.delete("r");

      url.search = searchParams.toString();
      window.history.replaceState(null, "", url.toString());
      setCount((state) => state + 1);
    }
  };

  return (
    <div className="max-w-[1500px] m-auto p-5">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Link
            to={routes.REVIEWS}
            className="px-2 py-2 bg-white rounded-md mr-4 cursor-pointer border-2 border-purple-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-violet-900"
            >
              <path
                fillRule="evenodd"
                d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>

          <span className=" text-xl font-bold">Your Reviews</span>
        </div>

        <div className="flex gap-4 items-center">
          <span>
            <select
              onChange={(e) => ratingHandler(e)}
              name=""
              className="w-auto px-5 py-2 bg-white text-gray-600 rounded-xl cursor-pointer shadow font-semibold italic  gap-3 items-center"
            >
              <option value="6">select rating</option>
              <option value="1">1 star</option>
              <option value="2">2 star</option>
              <option value="3">3 star</option>
              <option value="4">4 star</option>
              <option value="5">5 star</option>
              <option value="6">reset</option>
            </select>
          </span>

          <span
            onClick={() => filterHandler("true")}
            className={`w-auto px-7 py-2 bg-white text-gray-600 rounded-xl cursor-pointer shadow font-semibold italic flex gap-3 items-center ${
              filter === "true" ? "border-2 border-gray-400" : ""
            }`}
          >
            Live{" "}
            <WavePulse
              style={{ background: "#DFE6E2" }}
              inner={{ background: "forestgreen" }}
            />
          </span>

          <span
            onClick={() => filterHandler("null")}
            className={`w-auto px-7 py-2 bg-white text-gray-600 rounded-xl cursor-pointer shadow font-semibold italic flex gap-3 items-center ${
              filter === "null" ? "border-2 border-gray-400" : ""
            }`}
          >
            Moderation
            <WavePulse
              style={{ background: "#FFE4CC" }}
              inner={{ background: "#F4841B" }}
            />
          </span>

          <span
            onClick={() => filterHandler("false")}
            className={`w-auto px-7 py-2 bg-white text-gray-600 rounded-xl cursor-pointer shadow font-semibold italic flex gap-3 items-center ${
              filter === "false" ? "border-2 border-gray-400" : ""
            }`}
          >
            Removed <WavePulse />
          </span>

          {filter && (
            <span
              onClick={() => filterResetHandler()}
              className="px-2 py-2 bg-purple-800 rounded-md mr-4 cursor-pointer flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 text-white"
              >
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </span>
          )}
        </div>
      </div>

      <div className="mt-9">
        <ul className="grid grid-cols-7 gap-4 px-2 justify-between border-b py-4 font-bold text-gray-800 text-center">
          <li>S. No.</li>
          <li>Username</li>
          <li>Email Address</li>

          <li
            title="sort by date"
            className="flex gap-2 justify-center cursor-pointer "
            onClick={() => sortHandler()}
          >
            <span className="">Date</span>
            <span>
              <UpDownArrow />
            </span>
          </li>

          <li>Rating</li>
          <li>Status</li>
          <li>Action</li>
        </ul>

        <div className="mt-4 space-y-4">
          {!tableLoader ? (
            <>
              {reviews.length ? (
                reviews.map((e, index) => (
                  <ReviewCard
                    key={e.id}
                    data={e}
                    index={index + 1 + (page - 1) * 5}
                    openHandler={openHandler}
                    openId={openId}
                    replySubmitHandler={replySubmitHandler}
                    replyTextUpdateHandler={replyTextUpdateHandler}
                    setActiveReply={setActiveReply}
                    activeReply={activeReply}
                  />
                ))
              ) : (
                <div className=" flex justify-center items-center py-36 my-6 rounded-2xl bg-white">
                  <h1 className="text-4xl font-bold text-gray-600">
                    No reviews to display.
                  </h1>
                </div>
              )}
            </>
          ) : (
            <SekeletonLoader />
          )}
        </div>
      </div>

      <nav
        className="flex flex-column flex-wrap md:flex-row justify-between items-center p-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-900 mb-4 md:mb-0 block w-full md:inline md:w-auto"></span>

        {Math.ceil(total / 5) > 1 && (
          <div>
            <ol className="flex justify-center gap-1 text-xs font-medium">
              {[...Array(total ? Math.ceil(total / 5) : 0)].map((_, index) => (
                <li
                  onClick={() => {
                    setPage(index + 1);
                    pageHandler(index + 1);
                  }}
                  key={index}
                  className={`block h-8 w-8 rounded text-center leading-8 cursor-pointer ${
                    page === index + 1
                      ? "border-purple-800 bg-purple-800 text-white"
                      : "border text-black bg-white"
                  }`}
                >
                  {index + 1}
                </li>
              ))}
            </ol>
          </div>
        )}
      </nav>
    </div>
  );
}

const SekeletonLoader = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => {
        return (
          <div
            key={index}
            className="bg-white animate-pulse rounded-2xl px-2 py-12"
          ></div>
        );
      })}
    </>
  );
};

const ReviewCard = ({
  data,
  index,
  openHandler,
  openId,
  replySubmitHandler,
  replyTextUpdateHandler,
  activeReply,
  setActiveReply,
}) => {
  const { rating, createdAt, name, email, active, review, reply } = data;

  return (
    <div className="bg-white rounded-2xl px-2 py-5">
      <div className="grid grid-cols-7 gap-6 justify-between content-center items-center text-center ">
        <div className="font-semibold">{index}.</div>
        <div className="">
          <span className=" bg-gray-100 rounded-md py-2 px-3 ml-2 text-base font-semibold">
            {name}
          </span>
        </div>

        <div>
          <span className="bg-gray-100 rounded-md py-2 px-3 ml-2 font-semibold">
            {email}
          </span>
        </div>
        <div>
          <span className="bg-gray-100 rounded-md py-2 px-3 ml-2 font-semibold ">
            {dateFormater(createdAt)}
          </span>
        </div>
        <div>
          <span className="bg-gray-100 rounded-md py-2 px-3 ml-2 font-semibold ">
            {rating}/5
          </span>
        </div>

        <div className="flex justify-center">
          <WavePulse
            style={
              active
                ? { background: "#dfe6e2" }
                : active === null
                ? { background: "#dfe6e2" }
                : { background: "#FFE4CC" }
            }
            inner={
              active
                ? { background: "forestgreen" }
                : active === null
                ? { background: "#F4841B" }
                : { background: "#F4841B" }
            }
          />
        </div>

        <div className="">
          <div
            onClick={() => openHandler(index + 1)}
            className="px-2 py-2 base-bg rounded-md mr-4 cursor-pointer border-2 border-purple-800 inline-block"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
        </div>
      </div>

      {openId === index + 1 && (
        <div className="mx-9">
          <div className="py-5 px-5 mt-5  rounded-lg bg-gray-100 font-bold text-sm">
            {review}
          </div>

          {activeReply === index + 1 && (
            <textarea
              onChange={(e) => replyTextUpdateHandler(e, index)}
              value={reply}
              className="py-5 px-5 mt-5 rounded-lg bg-gray-100 font-bold text-sm w-full border border-gray-300"
            />
          )}

          <div className="flex space-x-2">
            <button
              onClick={() => {
                activeReply === index + 1
                  ? replySubmitHandler(index)
                  : setActiveReply(index + 1);
              }}
              className="py-2 base-bg rounded-md cursor-pointer border-2 border-purple-800 inline-block text-white mt-4 px-8 font-bold"
            >
              reply
            </button>

            {activeReply === index + 1 && (
              <button
                onClick={() => setActiveReply(0)}
                className="py-2 bg-gray-200 rounded-md cursor-pointer border-2 inline-block mt-4 px-8 font-bold text-black"
              >
                cancel
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const WavePulse = ({ inner, ...other }) => {
  return (
    <span className="d-main" {...other}>
      <div className="s-cihl" style={{ ...inner }}></div>
    </span>
  );
};

// const filterHandler = async (event) => {
//   setTableLoader(true);
//   const url = new URL(location.href);
//   const searchParams = new URLSearchParams(url.search);

//   if (event.target.value === "lth" || event.target.value === "htl") {
//     searchParams.delete("filter");
//     searchParams.set("sort", event.target.value);
//   } else {
//     searchParams.delete("sort");
//     searchParams.set("filter", event.target.value);
//   }

//   url.search = searchParams.toString();

//   history.pushState({}, "", url);

//   try {
//     const result = await UserReviews(token, navigate, url.search);
//     setReview(result?.reviews);
//     setTotal(result?.total ?? 1);
//   } catch (error) {
//     console.error("Error fetching reviews:", error);
//   }

//   setTableLoader(false);
// };
