import React from "react";

import NProgress from "nprogress";
import { useEffect } from "react";
import "nprogress/nprogress.css";

const Fallback = () => {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <div id="loading-wrapper">
      <div id="loading-text">LOADING</div>
      <div id="loading-content"></div>
    </div>
  );
};

export default Fallback;
