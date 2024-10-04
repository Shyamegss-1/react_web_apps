import { Box, IconButton, Grid, styled } from "@mui/material";
import React from "react";
import Iconify from "../iconify/Iconify";

const StyledConatiner = styled("div")({
  flexDirection: "column",
  alignItems: "center",
  display: "inline-flex",
  justifyContent: "center",
  margin: "4px",
  width: " 80px",
  height: "80px",
  borderRadius: "10px",
  overflow: "hidden",
  position: "relative",
  border: " 1px solid rgba(145, 158, 171, 0.24)",
});

const StyledSpan = styled("span")({
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  width: "fit-content",
  height: "inherit",
});

const Index = ({ index, remove }) => {
  return (
    <StyledConatiner>
      <StyledSpan>
        <img style={csadad} src={index} alt="product_image" />
      </StyledSpan>

      <IconButton onClick={() => remove(index)} size="small" sx={sdasdsa}>
        <Iconify icon={"mdi:cancel-circle"} />
      </IconButton>
    </StyledConatiner>
  );
};

export default Index;

const csadad = {
  width: "100%",
  height: "100%",
  flexShrink: 0,
  objectFit: "cover",
  position: "absolute",
};

const sdasdsa = {
  position: "absolute",
  top: 0,
  right: 0,
};
