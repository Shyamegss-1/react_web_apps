import React from "react";
import { NavLink } from "react-router-dom";
import { IMAGE_PATH, ROUTE_PATH } from "../../../utils/path-constants";

interface NavMenuProps {
  icon: string;
  text: string;
  to?: string;
}

const NavMenu: React.FC<NavMenuProps> = ({ icon, text, to = "#" }) => {
  return (
    <li className="navbar-tab">
      <NavLink
        to={ROUTE_PATH + to}
        className="relative flex flex-row items-center h-11 w-[95%] rounded-lg m-auto focus:outline-none hover:bg-green-200 text-gray-600 hover:text-gray-800 border-l-4 border-transparent pr-6 "
      >
        <span className="inline-flex justify-center items-center ml-4">
          <img src={IMAGE_PATH + icon} alt="icon" />
        </span>

        <span className="ml-2 text-md font-semibold tracking-wide truncate">
          {text}
        </span>
      </NavLink>
    </li>
  );
};

export default NavMenu;
