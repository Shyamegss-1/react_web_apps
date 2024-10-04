/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { GetBusinessScore } from "../../service/opreations/reviewDetailsApi";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  const search = new URLSearchParams(location.search).get("search");

  const [state, setState] = useState({});

  useEffect(() => {
    (async () => {
      const data = await GetBusinessScore(navigate, search);

      setState(data);
    })();
  }, []);

  function removeHttpsAndWww(url) {
    let cleanedUrl = url?.replace(/^https:\/\//, "");
    cleanedUrl = cleanedUrl?.replace(/^www\./, "");

    return cleanedUrl;
  }

  return (
    <div className=" flex items-center justify-center p-16">
      {state.avg ? (
        <div className=" w-3/12 m-auto shadow-xl border-2 border-purple-900  rounded-2xl">
          <div className="w-full px-6 py-16 rounded-2xl">
            <h1 className="text-center mb-9 text-5xl font-bold text-green-900">
              Review Score
            </h1>

            <div className=" text-center ">
              <div className="my-6">
                {state.review !== 0 ? (
                  <a
                    href={`https://${removeHttpsAndWww(
                      state?.data?.website ?? ""
                    )}`}
                    target="_blank"
                  >
                    <span className="text-center px-4 py-2 rounded-3xl mb-4 text-[16px] cursor-pointer font-semibold bg-yellow-500 hover:underline">
                      {removeHttpsAndWww(state?.data?.website ?? "")}
                    </span>
                  </a>
                ) : (
                  ""
                )}

                {state.review !== 0 ? (
                  <h3
                    className={`text-center my-4 text-5xl font-bold  ${
                      state?.avg?.average_rating <= 2
                        ? "text-red-600"
                        : state?.avg?.average_rating === 3
                        ? "text-yellow-500"
                        : "text-green-800"
                    }`}
                  >
                    {state?.avg?.average_rating <= 2
                      ? "Poor"
                      : state?.avg?.average_rating === 3
                      ? "Good"
                      : "Excellent"}
                  </h3>
                ) : (
                  ""
                )}
              </div>

              <div>
                <StarX rating={state?.avg?.average_rating} />

                {state.review !== 0 ? (
                  <div>
                    <p className="text-center mb-4 text-xl font-extrabold mt-2">
                      {state?.avg?.average_rating || 0}/5
                    </p>

                    <p className="text-center mb-4 text-xl font-semibold mt-2">
                      Reviews received{" "}
                      <span className="cursor-pointer underline">
                        <a
                          href={`https://${removeHttpsAndWww(
                            state?.data?.website ?? ""
                          )}`}
                          target="_blank"
                        >
                          {state?.review}
                        </a>
                      </span>
                    </p>
                  </div>
                ) : (
                  <h1 className=" text-4xl font-semibold my-10">
                    No ratings yet
                  </h1>
                )}

                <div className=" w-[50%] m-auto mt-14">
                  <img src="/svg/meter.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-3/12 m-auto h-[600px] animate-pulse bg-gray-200 shadow-xl border-2 border-purple-900 rounded-2xl"></div>
      )}
    </div>
  );
}

const StarX = ({ rating = 0 }) => {
  return (
    <div className="flex items-center justify-center">
      {[...Array(5)].map((e, i) => (
        <svg
          key={i}
          className={`w-10 h-10 ${
            Math.floor(rating) > i
              ? "text-yellow-300"
              : " text-gray-300 dark:text-gray-500"
          } ms-1`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      ))}
    </div>
  );
};
