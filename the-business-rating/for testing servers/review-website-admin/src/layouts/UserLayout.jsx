import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

import VerticalLayout from "../core/layouts/VerticalLayout";

import VerticalAppBarContent from "./components/vertical/AppBarContent";

import { useSettings } from "../core/hooks/useSettings";

import navigation from "./navigation";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  const { settings, saveSettings } = useSettings();

  const hidden = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <VerticalLayout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      verticalNavItems={navigation()} // Navigation Items
      verticalAppBarContent={(
        props // AppBar Content
      ) => (
        <VerticalAppBarContent
          hidden={hidden}
          settings={settings}
          saveSettings={saveSettings}
          toggleNavVisibility={props.toggleNavVisibility}
        />
      )}
    >
      <Outlet />
    </VerticalLayout>
  );
};

export default UserLayout;
