import { useRoutes, RouteObject } from "react-router-dom";

import BaseLayout from "../layouts/base";

import Dashboard from "../page/dashboard";
import LoginPage from "../page/auth/login";
import ReviewUserPage from "../page/users/index";
import BusinessUserPage from "../page/businessUsers/index";
import BlogPage from "../page/blog/index";
import BusinessListingPage from "../page/listing";

const BASEPATH = "/admin";

export default function MainRoute() {
  const element: RouteObject = useRoutes([
    {
      path: BASEPATH + "/",
      element: <BaseLayout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "review-users",
          element: <ReviewUserPage />,
        },
        {
          path: "business-users",
          element: <BusinessUserPage />,
        },
        {
          path: "listing",
          element: <BusinessListingPage />,
        },
        {
          path: "blog",
          element: <BlogPage />,
        },
      ],
    },
    {
      path: BASEPATH + "/login",
      element: <LoginPage />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return element;
}

const NotFound = () => {
  return (
    <div className="grid h-screen place-content-center bg-zinc-900 px-4">
      <h1 className="uppercase tracking-widest text-white">404 | Not Found</h1>
    </div>
  );
};
