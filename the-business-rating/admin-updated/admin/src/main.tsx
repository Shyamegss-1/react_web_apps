import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import MainRoute from "./routes/main.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MainRoute />

      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  </React.StrictMode>
);
