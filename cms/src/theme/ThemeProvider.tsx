import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { themeCreator } from "./base";
import { StylesProvider } from "@mui/styles";

const ThemeProviderWrapper = (props: any) => {
  const theme = themeCreator("PureLightTheme");
  // appTheme
  // PureLightTheme
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
