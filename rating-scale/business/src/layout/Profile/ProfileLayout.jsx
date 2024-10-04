/* eslint-disable react/no-unescaped-entities */
import { Outlet, useNavigate } from "react-router-dom";
import ProfileLayoutMenu from "./profileLayoutMenu";
import { LogoutHandler } from "../../service/opreations/authApis";
import { useEffect, useState } from "react";
import AuthStore from "../../stores/authStore";
import configStore from "../../stores/configStore";
import ModalPortal from "../../components/portal/portal";
import { LogoutIcon } from "../../components/icons/customIcons";
import { routes } from "../../constants/router-path";

export default function ProfileLayout() {
  const navigate = useNavigate();

  const token = AuthStore((state) => state.userToken);
  const setSkeletonLoader = configStore((state) => state.setSkeletonLoader);
  const userDetailhandler = AuthStore((state) => state.userDetailhandler);
  const userData = AuthStore((state) => state.userDetails);

  const [model, setModel] = useState(false);

  useEffect(() => {
    (async () => {
      setSkeletonLoader(true);
      await userDetailhandler(token, navigate);
      setSkeletonLoader(false);
    })();
  }, []);

  return (
    <>
      <div className="bg-slate-100">
        {window.location.pathname !== routes.PROFILE && (
          <aside
            id="default-sidebar"
            className="fixed top-4 left-0 md:left-4 z-40 w-72 xl:w-72 lg:w-64 md:w-[260px] nav-onlu overflow-hidden transition-transform -translate-x-full md:translate-x-0 rounded-xl"
            aria-label="Sidebar"
          >
            <div className="h-full overflow-y-auto base-bg border-r-2">
              <ProfileLayoutMenu />
            </div>
          </aside>
        )}

        <div
          className={
            window.location.pathname !== routes.PROFILE ? "md:ml-72" : "ml-0"
          }
        >
          {window.location.pathname !== routes.PROFILE && (
            <div className=" max-w-[1500px] m-auto w-full border-b p-4 border-gray-300 ">
              <div className="flex justify-between space-x-2 relative items-center">
                <div>
                  <h1 className="text-4xl mt-2 font-bold">
                    Hello,{" "}
                    <span className=" text-violet-900">
                      {" "}
                      {userData.fname} {userData.lname}
                    </span>{" "}
                    👋
                  </h1>
                  <p className="mt-1 text-lg text-gray-400 font-semibold">
                    See what's going on
                  </p>
                </div>

                <div className="dus-button" onClick={() => setModel(true)}>
                  <span className="button-text">
                    <p>Logout</p>
                  </span>
                  <span className="button-icon">
                    <LogoutIcon />
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="min-h-screen h-auto">
            <div className="">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      <ModalPortal isOpen={model}>
        <div className="rounded-lg bg-white p-8 shadow-2xl w-[600px] ">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-24 h-24 m-auto text-red-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>

          <h2 className="text-lg font-bold  text-center">
            You are going to leave, are you sure ?
          </h2>

          <p className="mt-2 text-sm text-gray-500 text-center">
            Are you sure to logout? All Your unsaved data will be lost
          </p>

          <div className="flex gap-2 justify-center mt-5">
            <button
              onClick={() => LogoutHandler()}
              type="button"
              className="rounded bg-violet-50 border border-green-400 px-4 py-2 text-sm font-medium text-green-600"
            >
              Yes, I'm sure
            </button>

            <button
              onClick={() => setModel(false)}
              type="button"
              className="rounded bg-red-500 px-4 border border-red-400 py-2 text-sm font-medium text-white"
            >
              No, go back
            </button>
          </div>
        </div>
      </ModalPortal>
    </>
  );
}
