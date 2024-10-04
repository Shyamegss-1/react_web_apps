import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
import "react-quill/dist/quill.snow.css";

import { createEmotionCache } from "./core/utils/create-emotion-cache.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import rootReducers from "./reducer/index.js";

import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";

const cache = createEmotionCache();

const store = configureStore({
  reducer: rootReducers,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App cache={cache} />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
