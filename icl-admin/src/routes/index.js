import React from "react";
import { useRoutes, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/dashboard/DashboardLayout";
import SimpleLayout from "../layouts/simple/SimpleLayout";
import Page404 from "../pages/Page404";

import {
  HOME,
  BLOG,
  ADMIN,
  ABOUTUS,
  BLOGEDIT,
  CONTACT,
  HOMEBANNER,
  EDITHOMEBANNER,
  PRODUCTPAGE,
  PRODUCTEDIT,
  CATEGORIES,
  USER,
  ORDER,
  CATEGORIEEDIT,
  COUPON,
  PAYMENTGATEWAY,
  SUBSCRIBE,
  INVOICE,
  SEO,
  SETTING,
  NEWSLETTER,
} from "../constants/route-path";
import { Suspense } from "react";
import Fallback from "./fallback";

const Layout = (Component) => (props) =>
  (
    <Suspense fallback={<Fallback />}>
      <Component {...props} />
    </Suspense>
  );

const Home = Layout(React.lazy(() => import("../pages/Home")));
const BlogPage = Layout(React.lazy(() => import("../pages/BlogPage")));
const AboutPage = Layout(React.lazy(() => import("../pages/AboutPage")));
const ContactPage = Layout(React.lazy(() => import("../pages/ContactPage")));
const LoginPage = Layout(React.lazy(() => import("../pages/LoginPage")));
const HomeBanner = Layout(React.lazy(() => import("../pages/HomeBanner")));
const ProductPage = Layout(React.lazy(() => import("../pages/ProductsPage")));
const CategoryPage = Layout(
  React.lazy(() => import("../pages/CategoriesPage"))
);
const UserPage = Layout(React.lazy(() => import("../pages/userPage")));
const Orderpage = Layout(React.lazy(() => import("../pages/order")));
const CouponPage = Layout(React.lazy(() => import("../pages/CouponPage")));
const SubscribePage = Layout(React.lazy(() => import("../pages/subscription")));
const SeoPage = Layout(React.lazy(() => import("../pages/seoPage")));
const SettingPage = Layout(React.lazy(() => import("../pages/settingPage")));
const NewsLetter = Layout(React.lazy(() => import("../pages/newletter")));

const PaymentGatewayPage = Layout(
  React.lazy(() => import("../pages/paymentGatewayPage"))
);

const EditBanner = Layout(
  React.lazy(() => import("../sections/@dashboard/banner/editBanner"))
);
const BlogEditPage = Layout(
  React.lazy(() => import("../sections/@dashboard/BlogEdit"))
);
const EditProduct = Layout(
  React.lazy(() => import("../sections/@dashboard/editproduct"))
);

const EditCategory = Layout(
  React.lazy(() => import("../sections/@dashboard/categoryEdit"))
);

const Invoice = Layout(
  React.lazy(() => import("../sections/@dashboard/order/invoice"))
);

const MainRoutes = () => {
  const { isAuth } = JSON.parse(
    sessionStorage?.getItem("&^*")
      ? sessionStorage?.getItem("&^*")
      : JSON.stringify({ isAuth: false })
  );

  const routes = useRoutes([
    {
      path: HOME,
      element: isAuth ? <DashboardLayout /> : <LoginPage />,
      children: [
        { path: ADMIN, element: <Home /> },
        { path: BLOGEDIT, element: <BlogEditPage /> },
        { path: ABOUTUS, element: <AboutPage /> },
        { path: BLOG, element: <BlogPage /> },
        { path: CONTACT, element: <ContactPage /> },
        { path: HOMEBANNER, element: <HomeBanner /> },
        { path: EDITHOMEBANNER, element: <EditBanner /> },
        { path: PRODUCTPAGE, element: <ProductPage /> },
        { path: PRODUCTEDIT, element: <EditProduct /> },
        { path: CATEGORIES, element: <CategoryPage /> },
        { path: USER, element: <UserPage /> },
        { path: ORDER, element: <Orderpage /> },
        { path: CATEGORIEEDIT, element: <EditCategory /> },
        { path: COUPON, element: <CouponPage /> },
        { path: PAYMENTGATEWAY, element: <PaymentGatewayPage /> },
        { path: SUBSCRIBE, element: <SubscribePage /> },
        { path: INVOICE, element: <Invoice /> },
        { path: SEO, element: <SeoPage /> },
        { path: SETTING, element: <SettingPage /> },
        { path: NEWSLETTER, element: <NewsLetter /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to={HOME} />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
};

export default MainRoutes;
