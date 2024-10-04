/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import {
  UserReviewReply,
  UserReviewReports,
  UserReviewReportsActionHandler,
} from "../../../../service/opreations/reviewDetailsApi";
import AuthStore from "../../../../stores/authStore";
import { Link, useNavigate } from "react-router-dom";

import { dateFormater } from "../../../../utils/helpers";

import { routes } from "../../../../constants/router-path";
import { customToast } from "../../../../utils/customToast";

export default function Index() {
  const navigate = useNavigate();
  const token = AuthStore((state) => state.userToken);

  // state

  const [reviews, setReview] = useState([]);

  const [tableLoader, setTableLoader] = useState(false);

  const [openId, setOpenId] = useState(0);

  const [activeReply, setActiveReply] = useState(0);

  const [report, setReport] = useState([]);

  // ()=>

  useEffect(() => {
    setTableLoader(true);
    (async () => {
      const data = await UserReviewReports(token, navigate);
      setReport(data);
    })();
    setTableLoader(false);
  }, []);

  console.log(report);

  const openHandler = (index) => {
    if (openId === index) setOpenId(0);
    else setOpenId(index);
  };

  const statusChangeHandler = async (id, status) => {
    setTableLoader(true);
    const response = await UserReviewReportsActionHandler(token, navigate, {
      id,
      status: status === 1 ? false : true,
    });

    if (response === 200) {
      const r = report.find((e) => e.reviewId === id);
      r.active = status === 1 ? 0 : 1;

      setReview(status);
    }

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
              className="w-6 h-6 text-green-900"
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

        <div className="flex items-center">
          <span className=" text-lg text-red-600">
            * After receiving a report, you can modify that reviews after 3
            days.
          </span>
        </div>
      </div>

      <div className="mt-9">
        <ul className="grid grid-cols-7 gap-4 px-2 justify-between border-b py-4 font-bold text-gray-800 text-center">
          <li>S. No.</li>
          <li>Username</li>
          <li>Email Address</li>
          <li>Date</li>
          <li>Rating</li>
          <li>Report Type</li>
          <li>Action</li>
        </ul>

        <div className="mt-4 space-y-4">
          {!tableLoader ? (
            <>
              {report.length ? (
                report.map((e, index) => (
                  <ReviewCard
                    key={e.id}
                    data={e}
                    index={index + 1}
                    openHandler={openHandler}
                    openId={openId}
                    replySubmitHandler={replySubmitHandler}
                    replyTextUpdateHandler={replyTextUpdateHandler}
                    setActiveReply={setActiveReply}
                    activeReply={activeReply}
                    statusChangeHandler={statusChangeHandler}
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
  replyTextUpdateHandler,
  activeReply,
  statusChangeHandler,
}) => {
  const {
    rating,
    date,
    name,
    email,
    report,
    review,
    reply,
    review_user,
    reviewId,
    active,
  } = data;

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
            {dateFormater(date)}
          </span>
        </div>
        <div>
          <span className="bg-gray-100 rounded-md py-2 px-3 ml-2 font-semibold ">
            {rating}/5
          </span>
        </div>

        <div className="flex justify-center">
          <span className="bg-gray-100 rounded-md py-2 px-3 ml-2 font-semibold ">
            {report}
          </span>
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

          {active === 1 ? (
            <div
              onClick={() => statusChangeHandler(reviewId, active)}
              className="px-2 py-2 bg-red-500 rounded-md mr-4 cursor-pointer border-2 border-red-600 inline-block"
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
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
          ) : (
            <div
              onClick={() => statusChangeHandler(reviewId, active)}
              className="px-2 py-2 bg-blue-500 rounded-md mr-4 cursor-pointer border-2 border-blue-800 inline-block"
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
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {openId === index + 1 && (
        <div className="mx-9">
          <div className="py-5 px-5 mt-5  rounded-lg bg-gray-100 ">
            <div className="mb-4">
              <span className="font-extrabold text-sm ">Review by : </span>
              <span>{review_user}</span>
            </div>
            <p className="font-bold text-sm"> {review}</p>
          </div>

          {activeReply === index + 1 && (
            <textarea
              onChange={(e) => replyTextUpdateHandler(e, index)}
              value={reply}
              className="py-5 px-5 mt-5 rounded-lg bg-gray-100 font-bold text-sm w-full border border-gray-300"
            />
          )}
        </div>
      )}
    </div>
  );
};
