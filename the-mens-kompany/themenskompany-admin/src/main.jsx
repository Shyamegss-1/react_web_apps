import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import "react-lazy-load-image-component/src/effects/blur.css";

import "react-quill/dist/quill.snow.css";

import "yet-another-react-lightbox/styles.css";

import ThemeProvider from "./theme/index";
import MainRoute from "./routes/index.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <MainRoute />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
