/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { Navigation } from "./ProfileNavigation";

export default function ProfileLayoutMenu() {
  return (
    <div className="">
      <div className="w-2/3 m-auto my-7">
        {/* <img
          src="https://thebusinessrating.com/Logo.png"
          className="invert "
          alt=""
        /> */}

        <h1 className="text-center text-white font-semibold text-2xl">
          Company Logo
        </h1>
      </div>

      <div className="px-5 space-y-3">
        {Navigation.map((nav) => (
          <MenuButton
            key={nav.link}
            link={nav.link}
            title={nav.title}
            icon={nav.icon}
          />
        ))}
      </div>
    </div>
  );
}

const MenuButton = ({ link, title, icon }) => (
  <div
    className={`w-full rounded-lg text-white hover:bg-purple-100 hover:text-black ${
      window.location.pathname === link &&
      "secondary-bg text-jade shadow-md hover:secondary-bg"
    }  `}
  >
    <NavLink to={link} className="rounded-xl w-full ">
      <div className="flex py-2 px-7 items-center space-x-4">
        <Icon icon={icon} />
        <p className="text-[14px] font-semibold">{title}</p>
      </div>
    </NavLink>
  </div>
);

const Icon = ({ icon }) => (
  <span className="text-xl">
    <i className={`fa ${icon}`} aria-hidden="true"></i>
  </span>
);
