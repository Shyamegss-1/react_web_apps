import React from "react";
import { Box } from "@mui/material";

import { Outlet } from "react-router-dom";
import Header from "../header";

const BaseLayout = () => {
  return (
    <Box sx={{ width: "90%", m: "auto", p: "20px 0" }}>
      <Header />

      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default BaseLayout;
