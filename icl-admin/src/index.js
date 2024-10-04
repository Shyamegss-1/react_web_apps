import React, { Suspense } from "react";

import { HelmetProvider } from "react-helmet-async";

import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals";
import MainRoutes from "./routes";
import ThemeProvider from "./theme/index";
import { BrowserRouter } from "react-router-dom";
import "react-quill/dist/quill.snow.css";

import ScrollToTop from "./routes/toScrollTop";
import Fallback from "./routes/fallback";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Suspense fallback={<Fallback />}> */}
      <HelmetProvider>
        <ThemeProvider>
          <MainRoutes />
        </ThemeProvider>
      </HelmetProvider>
      <ScrollToTop />
      {/* </Suspense> */}
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
