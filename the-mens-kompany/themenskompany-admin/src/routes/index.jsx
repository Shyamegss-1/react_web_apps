import React, { Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import { CONTACT, PRODUCTS, HOME, COUPON } from "../constants/route-path";
import FallBack from "./fallBack";

const Layout = (Component) => (props) =>
  (
    <Suspense fallback={<FallBack />}>
      <Component {...props} />
    </Suspense>
  );

const DashboardLayout = Layout(
  React.lazy(() => import("../layouts/dashboard/DashboardLayout"))
);

const OrderPage = Layout(React.lazy(() => import("../content/pages/orders")));
const UserPage = Layout(React.lazy(() => import("../content/pages/user")));

const PaymentPage = Layout(
  React.lazy(() => import("../content/pages/payment"))
);
const ProductsPage = Layout(
  React.lazy(() => import("../content/pages/Products"))
);

const ContactPage = Layout(
  React.lazy(() => import("../content/pages/contact"))
);

const HomeBannerPage = Layout(
  React.lazy(() => import("../content/pages/content-management/Homebanner"))
);
const SocialLinksContact = Layout(
  React.lazy(() => import("../content/pages/content-management/socialLinks"))
);

const CouponPage = Layout(React.lazy(() => import("../content/pages/coupon")));
const LoginPage = Layout(React.lazy(() => import("../content/pages/login")));
const HomePage = Layout(React.lazy(() => import("../content/pages/dashboard")));

const BlogPage = Layout(
  React.lazy(() => import("../content/pages/content-management/blog"))
);

const BLOGPREVIEWPAGE = Layout(
  React.lazy(() =>
    import("../content/sections/@content-management/$blogs/view/post-view")
  )
);

const POSTCREATEPAGE = Layout(
  React.lazy(() =>
    import(
      "../content/sections/@content-management/$blogs/edit/post-create-view"
    )
  )
);

const OrderInvoice = Layout(
  React.lazy(() => import("../content/sections/@order/orderInvoice"))
);

const I404PAGE = Layout(React.lazy(() => import("./404")));

//-----------------------------------------------------------------------------------

const { isAuth } = JSON.parse(
  sessionStorage?.getItem("&^*")
    ? sessionStorage?.getItem("&^*")
    : JSON.stringify({ isAuth: false })
);

const MainRoute = () => {
  const route = useRoutes([
    {
      path: HOME + "login",
      element: <LoginPage />,
    },
    {
      path: "*",
      element: <Navigate to={HOME} />,
    },
    {
      path: HOME,
      element: isAuth ? <DashboardLayout /> : <LoginPage />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "order",
          children: [
            {
              path: "",
              element: <OrderPage />,
            },
            {
              path: "user",
              element: <UserPage />,
            },
            {
              path: "payment-details",
              element: <PaymentPage />,
            },
            {
              path: "invoice",
              element: <OrderInvoice />,
            },
          ],
        },
        {
          path: "content",
          children: [
            {
              path: "home-banner",
              element: <HomeBannerPage />,
            },
            {
              path: "links-soci",
              element: <SocialLinksContact />,
            },
            {
              path: "blog",
              children: [
                {
                  path: "",
                  element: <BlogPage />,
                },
                {
                  path: "preview",
                  element: <BLOGPREVIEWPAGE />,
                },
                {
                  path: "edit",
                  element: <POSTCREATEPAGE />,
                },
              ],
            },
          ],
        },
        {
          path: PRODUCTS,
          element: <ProductsPage />,
        },
        {
          path: CONTACT,
          element: <ContactPage />,
        },
        {
          path: COUPON,
          element: <CouponPage />,
        },
      ],
    },
  ]);

  return route;
};

export default MainRoute;
