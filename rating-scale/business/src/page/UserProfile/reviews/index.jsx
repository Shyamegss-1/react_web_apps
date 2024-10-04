/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import {
  UserReviewCAlcApi,
  UserReviewReports,
  UserReviewStatsApi,
} from "../../../service/opreations/reviewDetailsApi";
import AuthStore from "../../../stores/authStore";
import { Link, useNavigate } from "react-router-dom";
import ReviewStats from "./reviewStats";
import configStore from "../../../stores/configStore";

import { routes } from "../../../constants/router-path";

export default function Index() {
  const navigate = useNavigate();
  const token = AuthStore((state) => state.userToken);

  const setSkeletonLoader = configStore((state) => state.setSkeletonLoader);
  const skeletonLoader = configStore((state) => state.skeletonLoader);

  // state

  const [state, setState] = useState({});

  const [calc, setCalc] = useState({});

  const [report, setReport] = useState([]);

  // ()=>

  useEffect(() => {
    (async () => {
      setSkeletonLoader(true);
      const data = await UserReviewStatsApi(token, navigate);
      const res = await UserReviewCAlcApi(token, navigate);

      setState(data);
      setCalc(res);

      setSkeletonLoader(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await UserReviewReports(token, navigate);
      setReport(data);
    })();
  }, []);

  return (
    <div className="max-w-[1500px] m-auto p-5">
      {!skeletonLoader ? (
        <ReviewStats state={state} calc={calc} report={report} />
      ) : (
        <div className="w-full mt-6">
          <div
            className={`h-[150px] animate-pulse rounded-2xl cursor-pointer p-4 bg-gray-300 flex flex-col justify-between`}
          ></div>
        </div>
      )}

      <div className="my-10">
        <Link
          to={routes.REVIEWS + "/list"}
          className=" base-bg text-white px-3 py-4 rounded text-lg font-semibold  hover:opacity-75 "
          role="button"
        >
          View All Reviews
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={`row-span-1 rounded-2xl cursor-pointer p-5 bg-white`}>
          <p className=" font-bold text-gray-400"> Live Reviews</p>

          <div className="flex mt-2 items-center justify-between">
            <div className="flex items-center">
              <p className="flex items-center">
                <WavePulse
                  style={{ marginTop: "11px", background: "#DFE6E2" }}
                  inner={{ background: "forestgreen" }}
                />

                <span className="text-4xl font-semibold mt-3 ml-4 ">
                  {state.true ?? 0} Live Reviews
                </span>
              </p>
            </div>

            <div>
              <Link
                to={routes.REVIEWS + "/list?filter=true"}
                className="base-bg text-white px-10 py-2 rounded text-lg font-semibold  hover:opacity-75"
              >
                View
              </Link>
            </div>
          </div>
        </div>

        <div className={`row-span-1 rounded-2xl cursor-pointer p-5 bg-white`}>
          <p className=" font-bold text-gray-400">Reviews on Moderation</p>

          <div className="flex mt-2 items-center justify-between">
            <div className="flex items-center">
              <p className="flex items-center">
                <WavePulse
                  style={{ marginTop: "11px", background: "#FFE4CC" }}
                  inner={{ background: "#F4841B" }}
                />

                <span className="text-4xl font-semibold mt-3 ml-4 ">
                  {state.null ?? 0} Reviews
                </span>
              </p>
            </div>

            <div>
              <Link
                to={routes.REVIEWS + "/list?filter=null"}
                className="base-bg text-white px-10 py-2 rounded text-lg font-semibold  hover:opacity-75"
              >
                View
              </Link>
            </div>
          </div>
        </div>

        <div className={`row-span-1 rounded-2xl cursor-pointer p-5 bg-white`}>
          <p className=" font-bold text-gray-400">Removed Reviews</p>

          <div className="flex mt-2 items-center justify-between">
            <div className="flex items-center">
              <p className="flex items-center">
                <WavePulse style={{ marginTop: "11px" }} />

                <span className="text-4xl font-semibold mt-3 ml-4 ">
                  {state.false ?? 0} Removed Reviews
                </span>
              </p>
            </div>

            <div>
              <Link
                to={routes.REVIEWS + "/list?filter=false"}
                className="base-bg text-white px-10 py-2 rounded text-lg font-semibold  hover:opacity-75"
              >
                View
              </Link>
            </div>
          </div>
        </div>

        <div className={`row-span-1 rounded-2xl cursor-pointer p-5 bg-white`}>
          <p className="font-bold text-gray-400">Reports On Reviews</p>

          <div className="flex mt-2 items-center justify-between">
            <div className="flex items-center">
              <p className="flex items-center">
                <WavePulse
                  style={{ marginTop: "11px", background: "#FFEBBD" }}
                  inner={{ background: "#E3B448" }}
                />

                <span className="text-4xl font-semibold mt-3 ml-4 ">
                  {report.length ?? 0} Reports
                </span>
              </p>
            </div>

            <div>
              <Link
                to={routes.REVIEWS + "/report"}
                className="base-bg text-white px-10 py-2 rounded text-lg font-semibold  hover:opacity-75"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const WavePulse = ({ inner, ...other }) => {
  return (
    <span className="d-main" {...other}>
      <div className="s-cihl" style={{ ...inner }}></div>
    </span>
  );
};
