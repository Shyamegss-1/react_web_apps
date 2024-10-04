import { Suspense, lazy } from "react";
import { RouteObject } from "react-router-dom";
import BaseLayout from "./layout/baseLayout";

import SuspenseLoader from "./components/suspenceLoader";

const Loader = (Component: any) => (props: any) => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );
};

const Home = Loader(lazy(() => import("./content/pages/home")));
const DetailPage = Loader(lazy(() => import("./content/pages/detailPage.js")));

const routes: RouteObject[] = [
  {
    path: "",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/room/:roomid/:location",
        element: <DetailPage />,
      },
    ],
  },
];

export default routes;
