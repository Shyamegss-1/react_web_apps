import React, { Suspense, useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

function SuspenseLoader() {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return;
}

function Back() {
  return (
    <div className="container-loader">
      <div class="loader"></div>
    </div>
  );
}
const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, []);

  return children;
};

const Layout = (Component) => (props) =>
  (
    <Suspense fallback={<Back />}>
      <Component {...props} />
    </Suspense>
  );

const LayoutChild = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// ** Layouts

const UserLayout = Layout(React.lazy(() => import("../layouts/UserLayout")));
const LoginPage = Layout(React.lazy(() => import("../pages/LoginPage")));
const Error404 = Layout(React.lazy(() => import("./404")));

// ** pages

const Dashbaord = LayoutChild(React.lazy(() => import("../pages/Dashboard")));
const Department = LayoutChild(React.lazy(() => import("../pages/Department")));
const Jobs = LayoutChild(React.lazy(() => import("../pages/jobs")));
const Category = LayoutChild(React.lazy(() => import("../pages/categories")));
const Carrer = LayoutChild(React.lazy(() => import("../pages/carrer")));
const Setting = LayoutChild(React.lazy(() => import("../pages/admin")));

const JobEdit = LayoutChild(
  React.lazy(() => import("../core/sections/jobs/edit-jobs/edit-job"))
);

const MainRoute = () => {
  const routes = useRoutes([
    {
      path: "/admin",
      element: (
        <PrivateRoute>
          <UserLayout />
        </PrivateRoute>
      ),
      children: [
        {
          path: "",
          element: <Dashbaord />,
        },
        {
          path: "department",
          element: <Department />,
        },
        {
          path: "carrer",
          element: <Carrer />,
        },
        {
          path: "category",
          element: <Category />,
        },
        {
          path: "setting",
          element: <Setting />,
        },
        {
          path: "jobs",
          children: [
            {
              path: "",
              element: <Jobs />,
            },
            {
              path: "edit",
              element: <JobEdit />,
            },
          ],
        },
      ],
    },
    {
      path: "/admin/login",
      element: <LoginPage />,
    },
    {
      path: "*",
      element: <Error404 />,
    },
  ]);

  return routes;
};

export default MainRoute;
