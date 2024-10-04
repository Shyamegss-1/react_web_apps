// ** MUI Imports
import Box from "@mui/material/Box";

// ** Components
import ModeToggler from "../../../core/layouts/components/shared-components/ModeToggler";
import UserDropdown from "../../../core/layouts/components/shared-components/UserDropdown";

const AppBarContent = (props) => {
  // ** Props
  const { settings, saveSettings } = props;

  // ** Hook

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        className="actions-left"
        sx={{ mr: 2, display: "flex", alignItems: "center" }}
      ></Box>
      <Box
        className="actions-right"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <ModeToggler settings={settings} saveSettings={saveSettings} />

        <UserDropdown />
      </Box>
    </Box>
  );
};

export default AppBarContent;
