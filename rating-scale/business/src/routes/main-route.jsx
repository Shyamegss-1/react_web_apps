/* eslint-disable react/prop-types */

import { useRoutes, useNavigate } from "react-router-dom";

//* @component Layouts

//* @imports Layouts
import BaseLayout from "../layout/Base";
import ProfileLayout from "../layout/Profile/ProfileLayout";

//* @imports Pages
import HomePage from "../page/HomePage";
import UserProfile from "../page/UserProfile";

import LoginPage from "../page/AuthPage/userLogin";
import SignupPage from "../page/AuthPage/userSignup";
import PasswordPage from "../page/AuthPage/userPassword";

import ReviewPage from "../page/UserProfile/reviews";
import ReviewListPage from "../page/UserProfile/reviews/list";
import ReviewReportPage from "../page/UserProfile/reviews/report";
import SettingPage from "../page/UserProfile/setting";
import ContactPage from "../page/UserProfile/contact";
import ProfilePage from "../page/UserProfile/PublicProfile";
import PricingPage from "../page/UserProfile/pricing";
import ListingScore from "../page/search";

import PlansPage from "../page/UserProfile/pricing/plans";

import NotFound from "./404";

import { useEffect } from "react";

import { routes } from "../constants/router-path";

const PrivateRoutes = ({ children }) => {
  const token = localStorage.getItem("error_log");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate(routes);
    } else if (window.location.pathname === routes.SIGNIN) {
      navigate(routes.DASHBOARD);
    }
  }, [token, navigate]);

  return children;
};

export default function MainRoute() {
  const routes = useRoutes([
    {
      path: "rating-business",
      element: <BaseLayout />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "score",
          element: <ListingScore />,
        },
      ],
    },
    {
      path: "/rating-business/dashboard",
      element: (
        <PrivateRoutes>
          <ProfileLayout />
        </PrivateRoutes>
      ),
      children: [
        {
          path: "",
          element: <UserProfile />,
        },
        {
          path: "review",
          element: <ReviewPage />,
        },
        {
          path: "review/list",
          element: <ReviewListPage />,
        },
        {
          path: "review/report",
          element: <ReviewReportPage />,
        },
        {
          path: "setting",
          element: <SettingPage />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "pricing",
          element: <PricingPage />,
        },
        {
          path: "pricing/plans",
          element: <PlansPage />,
        },
      ],
    },
    {
      path: "/rating-business/signin",
      element: (
        <PrivateRoutes>
          <LoginPage />
        </PrivateRoutes>
      ),
    },
    {
      path: "/rating-business/signup",
      element: <SignupPage />,
    },
    {
      path: "/rating-business/password/:token/:id",
      element: <PasswordPage />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return routes;
}
