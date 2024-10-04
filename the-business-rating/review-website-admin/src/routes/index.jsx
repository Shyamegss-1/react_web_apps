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
      <div className="loader"></div>
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
const Review = LayoutChild(React.lazy(() => import("../pages/Reviews")));
const Listing = LayoutChild(React.lazy(() => import("../pages/listing")));
const User = LayoutChild(React.lazy(() => import("../pages/user")));
const BusinessUser = LayoutChild(
  React.lazy(() => import("../pages/businessUser"))
);
const BusinessUserDetails = LayoutChild(
  React.lazy(() => import("../core/sections/businessUser/details"))
);

const BusinessUserDetailReview = LayoutChild(
  React.lazy(() => import("../core/sections/businessUser/reviewByListing"))
);

const BusinessUserDetailReport = LayoutChild(
  React.lazy(() => import("../core/sections/businessUser/reportByListing"))
);

const BusinessUserDetailSubscription = LayoutChild(
  React.lazy(() => import("../core/sections/businessUser/subscription"))
);
const Blog = LayoutChild(React.lazy(() => import("../pages/blogs")));
const Footer = LayoutChild(React.lazy(() => import("../pages/footer")));

const PostBlog = LayoutChild(
  React.lazy(() => import("../core/sections/blogs/editBlog"))
);

const PostBlogComments = LayoutChild(
  React.lazy(() => import("../core/sections/blogs/blogComments"))
);

const PostBlogCategory = LayoutChild(
  React.lazy(() => import("../core/sections/blogs/editCategory"))
);

const BusinessCategory = LayoutChild(
  React.lazy(() => import("../core/sections/jobs/business-category"))
);

const AddBusinessListing = LayoutChild(
  React.lazy(() => import("../core/sections/addListings"))
);

const SubscriptionsPage = LayoutChild(
  React.lazy(() => import("../pages/subscription"))
);

const ReportPage = LayoutChild(React.lazy(() => import("../pages/report")));

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
          path: "review",
          element: <Review />,
        },
        {
          path: "user",
          element: <User />,
        },
        {
          path: "businessuser",
          element: <BusinessUser />,
        },
        {
          path: "report",
          element: <ReportPage />,
        },
        {
          path: "subscription",
          element: <SubscriptionsPage />,
        },
        {
          path: "businessuser/details",
          element: <BusinessUserDetails />,
        },
        {
          path: "businessuser/review",
          element: <BusinessUserDetailReview />,
        },
        {
          path: "businessuser/report",
          element: <BusinessUserDetailReport />,
        },
        {
          path: "businessuser/subscription",
          element: <BusinessUserDetailSubscription />,
        },
        {
          path: "footer",
          element: <Footer />,
        },
        {
          path: "listing",
          children: [
            {
              path: "",
              element: <Listing />,
            },
            {
              path: "category",
              element: <BusinessCategory />,
            },
            {
              path: "add",
              element: <AddBusinessListing />,
            },
          ],
        },
        {
          path: "blog",
          children: [
            {
              path: "",
              element: <Blog />,
            },
            {
              path: "edit/:id",
              element: <PostBlog />,
            },
            {
              path: "comments/:id",
              element: <PostBlogComments />,
            },
            {
              path: "category",
              element: <PostBlogCategory />,
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
