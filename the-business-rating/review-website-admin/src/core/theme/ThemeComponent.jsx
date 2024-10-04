import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

import themeConfig from "../../config/themeConfig";

import overrides from "./overrides";
import typography from "./typography";

import themeOptions from "./ThemeOptions";

import GlobalStyling from "./globalStyles";

const ThemeComponent = (props) => {
  const { settings, children } = props;

  const coreThemeConfig = themeOptions(settings);

  let theme = createTheme(coreThemeConfig);

  theme = createTheme(theme, {
    components: { ...overrides(theme) },
    typography: { ...typography },
  });

  if (themeConfig.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={() => GlobalStyling(theme)} />
      {children}
    </ThemeProvider>
  );
};

export default ThemeComponent;
