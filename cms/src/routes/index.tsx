import React, { Suspense } from "react";
import { RouteObject } from "react-router-dom";
import Fallback from "./fallback";

import * as route from "../constant/_routePath";

const Layout = (Component: React.FC) => (props: any) =>
  (
    <Suspense fallback={<Fallback />}>
      <Component {...props} />
    </Suspense>
  );

const Dashboard = Layout(
  React.lazy(() => import("../content/pages/dashboard"))
);
const DashboardLayout = Layout(
  React.lazy(() => import("../layouts/dashboardLayout"))
);

const BaseLayout = Layout(React.lazy(() => import("../layouts/baseLayout")));
const AreaLayout = Layout(
  React.lazy(() => import("../content/pages/areaLayout/areaLayout"))
);

const routes: RouteObject[] = [
  {
    path: "cms",
    element: <DashboardLayout />,
    children: [{ path: "", element: <Dashboard /> }],
  },
  {
    path: route.DASHBOARD,
    element: <BaseLayout />,
    children: [{ path: "customise", element: <AreaLayout /> }],
  },
];

export default routes;
