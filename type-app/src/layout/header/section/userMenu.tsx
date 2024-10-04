import { Box } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { CardContent, Card } from "@mui/material";

import { SyntheticEvent } from "react";

const Usermenu = () => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  // ** Hooks

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card
        onClick={handleDropdownOpen}
        elevation={0}
        variant="outlined"
        sx={{
          borderRadius: "20px",
          cursor: "pointer",
          "&:hover": { boxShadow: "1px 2px 3px 1px #7676763b" },
        }}
      >
        <CardContent
          sx={{
            p: "7px 13px !important",
            display: "flex",
            gap: "10px",
          }}
        >
          <MenuIcon />

          <AccountCircleIcon />
        </CardContent>
      </Card>

      <Menu
        elevation={9}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{
          "& .MuiMenu-paper": {
            width: 230,
            marginTop: 2,
            borderRadius: "12px",
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>Login</Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>Signup</Box>
        </MenuItem>

        <Divider />

        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>Make You home</Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>Help</Box>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Usermenu;

const styles = {
  py: 1,
  px: 2,
  width: "100%",
  display: "flex",
  alignItems: "center",
  color: "text.primary",
  textDecoration: "none",
  "& svg": {
    fontSize: "1.375rem",
    color: "text.secondary",
  },
};
