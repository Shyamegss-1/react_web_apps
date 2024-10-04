import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import MainRoute from "./routes/main-route.jsx";
import BackToTop from "./utils/backToTop";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { ToastContainer } from "react-toastify";

import "react-international-phone/style.css";

import "react-toastify/dist/ReactToastify.css";
import OverlayLoader from "./components/overlayLoader/overlayLoader";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="146889476924-gjbgen7bdd3fm9716s0vqbp3nkchmr3v.apps.googleusercontent.com">
      <BrowserRouter>
        <OverlayLoader />
        <MainRoute />
        <BackToTop />
        <ToastContainer theme="colored" />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
