/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react";

import {
  UserSubscriptionDetails,
  UserSubscriptionHistory,
} from "../../../service/opreations/advertismentApi";

import AuthStore from "../../../stores/authStore";

import { useNavigate } from "react-router-dom";

import { dateFormater } from "../../../utils/helpers";
import configStore from "../../../stores/configStore";

import { routes } from "../../../constants/router-path";

export default function Index() {
  const [state, setState] = useState({});
  const [history, setHistory] = useState([]);

  const token = AuthStore((state) => state.userToken);
  const skeletonLoader = configStore((state) => state.skeletonLoader);
  const setSkeletonLoader = configStore((state) => state.setSkeletonLoader);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await UserSubscriptionDetails(token, navigate);
      setState(data);
    })();
  }, []);

  useEffect(() => {
    setSkeletonLoader(true);

    (async () => {
      const data = await UserSubscriptionHistory(token, navigate);

      setHistory(data);
    })();

    setSkeletonLoader(false);
  }, []);

  return (
    <div className="max-w-[1500px] m-auto h-screen">
      <div className="my-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold leading-[3rem] tracking-tight text-slate-900">
          Pricing Plans
        </h1>

        <button
          onClick={() => navigate(routes.SUBSCRIPTION + "/plans")}
          type="submit"
          className="text-white bg-primary-600 hover:bg-primary-700 base-bg font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-5"
        >
          View Plans
        </button>
      </div>

      {!skeletonLoader ? (
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <span className="text-lg font-bold text-gray-400">
              Subscription Status
            </span>

            <span className="flex items-center">
              <span className="d-main" style={{ background: "#DFE6E2" }}>
                <div
                  className="s-cihl"
                  style={{ background: "forestgreen" }}
                ></div>
              </span>

              <span className="text-4xl font-bold mt-2 ml-3">
                {new Date(state?.currentPlanEnd) >= Date.now()
                  ? "Active"
                  : !state?.planActive
                  ? "-----"
                  : "Expired"}
              </span>
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <span className="text-lg font-bold text-gray-400">
              Plan Started
            </span>

            <h1 className="text-4xl font-bold  mt-2">
              {state?.currentPlanStart
                ? dateFormater(state?.currentPlanStart ?? Date.now())
                : "----------"}
            </h1>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm">
            <span className="text-lg font-bold text-gray-400">
              Plan Ending Date
            </span>

            <h1 className="text-4xl font-bold  mt-2">
              {state?.currentPlanStart
                ? dateFormater(state?.currentPlanEnd ?? Date.now())
                : "----------"}
            </h1>
          </div>
        </div>
      ) : (
        <InfoSkeleton />
      )}

      <div className="my-6">
        <h1 className="text-3xl font-bold leading-[3rem] tracking-tight text-slate-900">
          Your Subscription History
        </h1>
      </div>

      <div className="relative overflow-x-auto sm:rounded-2xl mt-10">
        {!skeletonLoader ? (
          <>
            {history.length ? (
              <table className="w-full text-sm text-left rtl:text-right border-black">
                <thead className="border-b uppercase bg-white">
                  <tr className="">
                    <th scope="col" className="p-4"></th>

                    <th scope="col" className="px-6 py-5 text-sm">
                      S. No.
                    </th>

                    <th scope="col" className="px-6 py-5 text-sm">
                      Plan Starting Date
                    </th>

                    <th scope="col" className="px-6 py-5 text-sm">
                      Plan Ending Date
                    </th>

                    <th scope="col" className="px-6 py-5 text-sm">
                      Payment Mode
                    </th>

                    <th scope="col" className="px-6 py-5 text-sm">
                      Plan Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {history?.map((list, index) => (
                    <tr
                      key={index}
                      className={`border-b text-black hover:bg-gray-50 dark:hover:bg-gray-50 bg-white `}
                    >
                      <td className="w-4 p-4"></td>

                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 "
                      >
                        <p className="line-clamp-1">{index + 1}.</p>
                      </th>

                      <td className="px-6 py-4">
                        <p className="">
                          {dateFormater(list.currentPlanStart || Date.now())}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="">
                          {dateFormater(list.currentPlanEnd || Date.now())}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="line-clamp-1">Stripe</p>
                      </td>

                      <td className="px-6 py-4">
                        <p className={``}>
                          <span
                            className={`${
                              list.planActive === 1
                                ? "bg-violet-600"
                                : "bg-red-500"
                            } text-center text-base px-4 py-1 rounded-lg text-white font-semibold`}
                          >
                            {list.planActive === 1 ? "Active" : "Expired"}
                          </span>
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className=" flex justify-center items-center py-36 my-6 rounded-2xl bg-white">
                <h1 className="text-4xl font-bold text-gray-600">
                  No Subscription History
                </h1>
              </div>
            )}
          </>
        ) : (
          <TableSkeleton />
        )}
      </div>
    </div>
  );
}

const TableSkeleton = () => (
  <div className="relative overflow-x-auto shadow-md sm:rounded-2xl mt-10">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="border-b uppercase bg-white">
        <tr className="">
          {[...Array(6)].map((_, index) => (
            <th scope="col" key={index} className="p-4 py-6"></th>
          ))}
        </tr>
      </thead>

      <tbody>
        {[...Array(8)].map((_, index) => (
          <tr
            key={index}
            className={`border-b border-gray-200 text-black bg-gray-100  animate-pulse`}
          >
            <td className="w-4 p-4"></td>
            <th scope="row" className="px-6 py-6 font-medium text-gray-900 ">
              <p className="line-clamp-1"></p>
            </th>
            <td className="px-6 py-4">
              <p className=""></p>
            </td>
            <td className="px-6 py-4">
              <p className=""></p>
            </td>
            <td className="px-6 py-4">
              <p className="line-clamp-1"></p>
            </td>

            <td className="px-6 py-4">
              <div></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const InfoSkeleton = () => (
  <div className="grid grid-cols-3 gap-4 mt-4">
    {[...Array(3)].map((_, e) => (
      <div key={e} className=" bg-white p-24 animate-pulse rounded-2xl"></div>
    ))}
  </div>
);
