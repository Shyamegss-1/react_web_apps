/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthStore from "../../../stores/authStore";
import configStore from "../../../stores/configStore";
import { PurchaseHandler } from "../../../service/opreations/advertismentApi";

import { useNavigate } from "react-router-dom";
import ModalPortal from "../../../components/portal/portal";

import { routes } from "../../../constants/router-path";

export default function Plans() {
  const [state, setState] = useState(false);
  const [open, setOpen] = useState(false);

  const user = AuthStore((state) => state.userDetails);
  const premium = AuthStore((state) => state.subscripption);
  const setScreenLoader = configStore((state) => state.setScreenLoader);

  const navigate = useNavigate();

  const token = AuthStore((state) => state.userToken);

  const subscriptionPurchaseHandler = async () => {
    setOpen(false);
    setScreenLoader(true);

    const data = {
      listingid: user.details[0]?.id,
    };

    await PurchaseHandler(token, navigate, data);

    setScreenLoader(false);

    window.location.href = routes.DASHBOARD;
  };

  const TickSvg = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-5 w-5 text-green-800"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );

  return (
    <div className="max-w-[1500px] m-auto h-screen">
      <div className="my-6">
        <Link
          to={routes.SUBSCRIPTION}
          className="text-lg font-bold leading-[3rem] tracking-tight text-green-900 cursor-pointer"
        >
          <span className="mr-3">
            <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
          </span>{" "}
          Subscription / View Plans
        </Link>

        <div className="mt-5">
          <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8 sm:py-12 lg:px-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
              <div className="rounded-2xl border-t-8 border-gray-300 p-6 shadow-sm bg-white ring-green-800 sm:order-last sm:px-8 lg:p-12">
                <div className="text-center">
                  <h2 className="text-lg font-medium text-gray-900">
                    Starter
                    <span className="sr-only">Plan</span>
                  </h2>

                  <p className="mt-2 sm:mt-10">
                    <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                      {" "}
                      $0
                    </strong>
                    <span className="text-3xl font-bold text-gray-700">
                      /month
                    </span>
                  </p>
                </div>

                <div className="mt-4 flex justify-center">
                  <label className="relative inline-flex items-center cursor-pointer ">
                    <span className="ms-3 text-sm text-gray-900">
                      Free Forever
                    </span>
                  </label>
                </div>

                <button
                  disabled
                  className="my-8 block rounded-md w-full border border-gray-400 bg-gray-300 px-12 py-3 text-center text-sm font-medium text-black hover:bg-zinc-800 hover:text-white disabled:bg-gray-50 disabled:text-black"
                >
                  {!premium.m69_sub ? "Active plan" : "Get Started"}
                </button>

                <ul className="mt-6 space-y-2">
                  <li className="flex ml-6  items-center gap-1">
                    <TickSvg />

                    <span className=" text-lg text-gray-700">
                      {" "}
                      20 users included{" "}
                    </span>
                  </li>

                  <li className="flex ml-6  items-center gap-1">
                    <TickSvg />

                    <span className=" text-lg text-gray-700">
                      {" "}
                      5GB of storage{" "}
                    </span>
                  </li>

                  <li className="flex ml-6  items-center gap-1">
                    <TickSvg />

                    <span className=" text-lg text-gray-700">
                      {" "}
                      Email support{" "}
                    </span>
                  </li>

                  <li className="flex ml-6  items-center gap-1">
                    <TickSvg />

                    <span className=" text-lg text-gray-700">
                      {" "}
                      Help center access{" "}
                    </span>
                  </li>

                  <li className="flex ml-6  items-center gap-1">
                    <TickSvg />

                    <span className=" text-lg text-gray-700">
                      {" "}
                      Phone support{" "}
                    </span>
                  </li>

                  <li className="flex ml-6  items-center gap-1">
                    <TickSvg />

                    <span className=" text-lg text-gray-700">
                      {" "}
                      Community access{" "}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border-t-8 border-purple-800 p-6 shadow-sm bg-white ring-green-800 sm:order-last sm:px-8 lg:p-12">
                <div className="text-center">
                  <h2 className="text-lg font-medium text-gray-900">
                    Professionals Pack
                    <span className="sr-only">Plan</span>
                  </h2>

                  <p className="mt-2 sm:mt-10">
                    <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                      {" "}
                      {state ? "$300" : "$30"}
                    </strong>

                    <span className="text-3xl font-bold text-gray-700 relative">
                      /{state ? "yearly" : "mothly"}
                      {/* <span className="absolute top-0 text-basel">save $60</span> */}
                    </span>
                  </p>
                </div>

                <div className="mt-4 flex justify-center">
                  <label className="relative inline-flex items-center cursor-pointer ">
                    <input
                      type="checkbox"
                      onClick={(e) => setState(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

                    <span className="ms-3 text-sm text-gray-900 ">
                      Billed {state ? "yearly" : "mothly"}
                    </span>
                  </label>
                </div>

                <button
                  disabled={premium.m69_sub}
                  onClick={() => setOpen(true)}
                  className="my-8 block  rounded-md w-full border border-purple-800 bg-violet-800 px-12 py-3 text-center text-sm font-medium text-white hover:bg-violet-700 disabled:bg-gray-200 disabled:border-none hover:ring-1 hover:ring-green-700 focus:outline-none disabled:text-black"
                >
                  {premium.m69_sub ? "Active plan" : "Get Started"}
                </button>

                <ul className="mt-6 space-y-2">
                  <li className="flex ml-6  items-center gap-1">
                    <TickSvg />

                    <span className=" text-lg text-gray-700">
                      {" "}
                      20 users included{" "}
                    </span>
                  </li>

                  <li className="flex ml-6  items-center gap-1">
                    <TickSvg />

                    <span className=" text-lg text-gray-700">
                      {" "}
                      5GB of storage{" "}
                    </span>
                  </li>

                  <li className="flex ml-6  items-center gap-1">
                    <TickSvg />

                    <span className=" text-lg text-gray-700">
                      {" "}
                      Email support{" "}
                    </span>
                  </li>

                  <li className="flex ml-6  items-center gap-1">
                    <TickSvg />

                    <span className=" text-lg text-gray-700">
                      {" "}
                      Help center access{" "}
                    </span>
                  </li>

                  <li className="flex ml-6  items-center gap-1">
                    <TickSvg />

                    <span className=" text-lg text-gray-700">
                      {" "}
                      Phone support{" "}
                    </span>
                  </li>

                  <li className="flex ml-6  items-center gap-1">
                    <TickSvg />

                    <span className=" text-lg text-gray-700">
                      {" "}
                      Community access{" "}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PopupPlans
        open={open}
        closeHandler={setOpen}
        subButton={subscriptionPurchaseHandler}
      />
    </div>
  );
}
const PopupPlans = ({ open, closeHandler, subButton }) => {
  return (
    <ModalPortal isOpen={open}>
      <div className="rounded-lg bg-white p-8 shadow-2xl">
        <h2 className="text-lg font-bold">
          Are you sure you want to continue with this plan?
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Doing that could have cause some issues elsewhere, are you 100% sure
          it's OK?
        </p>

        <div className="mt-4 flex gap-2">
          <button
            onClick={subButton}
            type="button"
            className="rounded bg-violet-50 border border-green-400 px-4 py-2 text-sm font-medium text-green-600"
          >
            Yes, I'm sure
          </button>

          <button
            onClick={() => closeHandler(false)}
            type="button"
            className="rounded bg-gray-50 px-4 border border-gray-400 py-2 text-sm font-medium text-gray-600"
          >
            No, go back
          </button>
        </div>
      </div>
    </ModalPortal>
  );
};
