import { createContext, useState } from "react";

import themeConfig from "../../config/themeConfig";

const initialSettings = {
  themeColor: "primary",
  mode: themeConfig.mode,
  contentWidth: themeConfig.contentWidth,
};
export const SettingsContext = createContext({
  saveSettings: () => null,
  settings: initialSettings,
});

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({ ...initialSettings });

  const saveSettings = (updatedSettings) => {
    setSettings(updatedSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, saveSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;
