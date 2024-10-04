import { CacheProvider } from "@emotion/react";
import ThemeComponent from "./core/theme/ThemeComponent";
import {
  SettingsConsumer,
  SettingsProvider,
} from "./core/context/settingsContext";

import MainRoute from "./routes";
import { ErrorBoundary } from "./routes/errorBoundary";

function App(props) {
  const { cache } = props;

  return (
    <>
      <ErrorBoundary>
        <CacheProvider value={cache}>
          <SettingsProvider>
            <SettingsConsumer>
              {({ settings }) => {
                return (
                  <ThemeComponent settings={settings}>
                    <MainRoute />
                  </ThemeComponent>
                );
              }}
            </SettingsConsumer>
          </SettingsProvider>
        </CacheProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
