import ThemeProvider from "./theme/ThemeProvider";
import routes from "./routes";
import { useRoutes } from "react-router-dom";
import { CssBaseline } from "@mui/material";

function App() {
  const usePath = useRoutes(routes);

  return (
    <ThemeProvider>
      <CssBaseline />
      {usePath}
    </ThemeProvider>
  );
}

export default App;
