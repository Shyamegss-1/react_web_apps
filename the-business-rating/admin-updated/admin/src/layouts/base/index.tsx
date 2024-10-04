import { Outlet } from "react-router-dom";
import NavMenu from "./navigation/navMenu";
import navigation from "./navigation/nav";
import { Link1, Logout } from "iconsax-react";
import IconButton from "../../components/IconButton/IconButton";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased  text-gray-800">
      <div className="fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r border-dashed ">
        <div className="flex items-center justify-center h-16 ">
          <div className="w-[70%]">
            <img
              className="w-100"
              src="https://thebusinessrating.com/Logo.png"
              alt=""
            />
          </div>
        </div>

        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            {navigation.map((e) => (
              <NavMenu text={e.title} icon={e.icon} to={e.path} />
            ))}
          </ul>
        </div>
      </div>

      <div className="ml-64 bg-white bg-opacity-30 h-16 sticky top-0 p-2 flex justify-end items-center shadow-sm">
        <div className="flex gap-3">
          <IconButton
            variant="contained"
            Icon={<Link1 size="24" color="#fff" variant="Bold" />}
          >
            Review Website
          </IconButton>

          <IconButton
            variant="contained"
            Icon={<Link1 size="24" color="#fff" variant="Bold" />}
          >
            business Website
          </IconButton>

          <IconButton
            variant="secondary"
            Icon={<Logout size="24" color="#000" />}
          >
            Logout
          </IconButton>
        </div>
      </div>

      <div className="ml-72 mr-8 ">
        <div className="max-w-full h-full min-h-screen bg-slate-100 rounded-xl p-3 my-6 m-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
