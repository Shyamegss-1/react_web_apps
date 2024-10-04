/* eslint-disable react/prop-types */

import { useEffect } from "react";

import UpdateUserDetails, {
  PasswordUpdateFormHandler,
} from "./dashboard/UpdateUserDetails";

import AuthStore from "../../stores/authStore";
import MediaHandler from "./mediaHandler";
import configStore from "../../stores/configStore";
import { routes } from "../../constants/router-path";

import { Link } from "react-router-dom";
import {
  EmailIcon,
  JobIcon,
  LocationIcon,
  PhoneIcon,
  UserIcon,
  WebsiteIcon,
} from "../../components/icons/customIcons";
import AdHandler from "./AdHandler";

export default function Index() {
  const userData = AuthStore((state) => state.userDetails);
  const premium = AuthStore((state) => state.subscripption);
  const skeleton = configStore((state) => state.skeletonLoader);

  useEffect(() => {
    const handleClick = (event) => {
      const element = event.currentTarget;
      const accDes = element.nextElementSibling;

      const chev = element.querySelector(".poro");

      if (accDes.classList.contains("hidden")) {
        accDes.classList.remove("hidden");
        chev.classList.remove("fa-chevron-down");
        chev.classList.add("fa-chevron-up");
      } else {
        accDes.classList.add("hidden");
        chev.classList.add("fa-chevron-down");
        chev.classList.remove("fa-chevron-up");
      }
    };

    const addEventListeners = () => {
      const accProfElements = document.querySelectorAll(".ac-prof");
      accProfElements.forEach((element) => {
        element.addEventListener("click", handleClick);
      });
    };

    const removeEventListeners = () => {
      const accProfElements = document.querySelectorAll(".ac-prof");
      accProfElements.forEach((element) => {
        element.removeEventListener("click", handleClick);
      });
    };

    addEventListeners();

    return () => {
      removeEventListeners();
    };
  }, []);

  const UserInfoCard = ({ icon, title, text }) => {
    return (
      <div className="">
        <hr className="my-3" />

        <div className=" flex items-center px-4 gap-5">
          <span className="text-violet-800 h-9 w-9 rounded bg-gray-100 flex justify-center items-center">
            {icon}
          </span>

          <p className=" font-semibold w-24">{title}</p>
          <p className="line-clamp-1">: {text}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[1500px] m-auto p-5 ">
      {!skeleton ? (
        <div className="grid md:grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 my-6 grid-rows-1 gap-8">
          <div className="h-auto">
            <p className="text-2xl font-bold mb-5">Your Information</p>

            <div className="py-4 bg-white shadow-sm rounded-2xl">
              <p className="text-2xl px-4 font-bold">About You</p>

              <UserInfoCard
                title={"First Name"}
                text={userData?.fname}
                icon={<span className="font-bold text-2xl">F</span>}
              />

              <UserInfoCard
                title={"Last Name"}
                text={userData?.lname}
                icon={<span className=" font-bold text-2xl">L</span>}
              />

              <UserInfoCard
                icon={<EmailIcon />}
                title={"Email"}
                text={userData?.email}
              />

              <UserInfoCard
                icon={<PhoneIcon />}
                title={"Phone"}
                text={userData.details ? userData?.details[0]?.phone : 1}
              />
            </div>
          </div>

          <div className="h-auto">
            <p className="text-2xl font-bold mb-5">Update Account Details</p>

            <div className="py-4 bg-white shadow-sm rounded-2xl">
              <p className="text-2xl px-4 font-bold ">Username</p>
              <p className="px-4 text-sm text-gray-500 mt-2">
                Change your username anytime according to your desire!
              </p>

              <div className="px-4 mt-2">
                <UpdateUserDetails userData={userData} />
              </div>
            </div>
          </div>

          <div className=" h-auto">
            <p className="text-2xl font-bold mb-5">Your Uploads</p>
            <div className="py-4 bg-white shadow-sm rounded-2xl ">
              <p className="text-2xl px-4 font-bold mb-2">Advertisement</p>
              {premium?.m69_sub && <AdHandler />}
              {!premium?.m69_sub && <PremiumOverLay />}
            </div>
          </div>

          <div className=" h-auto">
            <div className="py-4 bg-white shadow-sm rounded-2xl">
              <p className="text-2xl px-4 font-bold ">About Your Company</p>

              <UserInfoCard
                icon={<UserIcon />}
                title={"Name"}
                text={userData?.companyname}
              />

              <UserInfoCard
                icon={<LocationIcon />}
                title={"Address"}
                text={userData?.address}
              />

              <UserInfoCard
                icon={<WebsiteIcon />}
                title={"Website"}
                text={userData?.website}
              />

              <UserInfoCard
                icon={<JobIcon />}
                title={"Job/Role"}
                text={userData?.jobtitle}
              />
            </div>
          </div>

          <div className="h-auto">
            <div className="py-4 bg-white shadow-sm rounded-2xl">
              <p className="text-2xl px-4 font-bold">Password Reset</p>

              <p className="px-4 text-sm text-gray-500 mt-2">
                Avoid yourself from ransoms by resetting your password!
              </p>

              <div className="px-4 mt-2">
                <PasswordUpdateFormHandler />
              </div>
            </div>
          </div>

          <div className="h-auto">
            <div className="py-4 bg-white shadow-sm rounded-2xl relative">
              <p className="text-2xl px-4 font-bold mb-2">Media</p>
              {premium?.m69_sub && <MediaHandler />}

              {!premium?.m69_sub && <PremiumOverLay />}
            </div>
          </div>
        </div>
      ) : (
        <Skeleton />
      )}
    </div>
  );
}

const PremiumOverLay = () => (
  <div className="  bg-gray-200 text-center rounded-xl mx-5 py-8 px-6 ">
    <div className="flex justify-center items-center  flex-col">
      <h1 className=" mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-14 h-14 text-violet-800"
        >
          <path
            fillRule="evenodd"
            d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </h1>

      <h1 className="text-xl font-bold ">
        This feature is available in premium. Upgrade & unlock all features ?
      </h1>

      <Link
        to={routes.SUBSCRIPTION + "/plans"}
        className="text-white bg-primary-600 hover:bg-primary-700 base-bg font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-5"
      >
        See Plans
      </Link>
    </div>
  </div>
);

const Skeleton = () => {
  return (
    <div className="grid grid-cols-3 my-6 grid-rows-2 gap-8">
      {[...Array(6)].map((_, e) => (
        <div key={e} className="bg-white p-40 rounded-2xl animate-pulse"></div>
      ))}
    </div>
  );
};

// keveme6378@wenkuu.com
