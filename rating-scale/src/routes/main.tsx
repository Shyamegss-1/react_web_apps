import { ReactNode } from "react";
import { RouteObject, useNavigate } from "react-router-dom";
import BaseLayout from "../layout/baseLayout";

import Home from "../page/home/index";
import Category from "../page/category";
import Signin from "../page/auth/signin";
import Signup from "../page/auth/signup";
import UserProfile from "../page/profile";
import CompanySearch from "../page/search";
import BlogsPage from "../page/blog";
import BlogDetailPage from "../page/blog/details";
import ListingDetailPage from "../page/listing";
import UserDetailPage from "../page/profile/user-details";
import UserReviewsPage from "../page/profile/reviews";
import ListingByCategory from "../page/category/listings";
import PasswordUpatePage from "../page/profile/updatePassword";

import { useEffect } from "react";
import { BASEROUTE } from "../utils/constants";

interface PrivateRoutesProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
  const state = JSON.parse(localStorage.getItem("authStore")! ?? {});
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.state.userToken) {
      navigate(BASEROUTE + "/sign-in");
    } else if (window.location.pathname === BASEROUTE + "/sign-in") {
      navigate(BASEROUTE);
    }
  }, [state.state.userToken, navigate]);

  return <>{children}</>;
};

const routes: RouteObject[] = [
  {
    path: "rating-scale",
    element: <BaseLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "category/:id",
        element: <ListingByCategory />,
      },
      {
        path: "user-profile",
        element: <UserProfile />,
        children: [
          {
            path: "detail",
            element: <UserDetailPage />,
          },
          {
            path: "reviews",
            element: <UserReviewsPage />,
          },
          {
            path: "updatepassword",
            element: <PasswordUpatePage />,
          },
        ],
      },
      {
        path: "search",
        element: <CompanySearch />,
      },
      {
        path: "blogs",
        element: <BlogsPage />,
      },
      {
        path: "blog/:id",
        element: <BlogDetailPage />,
      },
      {
        path: "listing/:id",
        element: <ListingDetailPage />,
      },
    ],
  },
  {
    path: "rating-scale/sign-in",
    element: (
      <PrivateRoutes>
        <Signin />
      </PrivateRoutes>
    ),
  },
  {
    path: "rating-scale/sign-up",
    element: <Signup />,
  },
];

export default routes;
