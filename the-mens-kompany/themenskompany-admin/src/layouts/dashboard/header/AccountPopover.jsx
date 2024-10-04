import { useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
} from "@mui/material";
// mocks_
import account from "../../../_mock/account";
import { useNavigate } from "react-router-dom";
import { HOME } from "../../../constants/route-path";
import CustomPopover from "../../../components/custom-popover/custom-popover";
import usePopover from "../../../components/custom-popover/use-popover";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: "eva:home-fill",
  },
  {
    label: "Setting",
    icon: "eva:home-fill",
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const Navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const logoutHandler = () => {
    setOpen(null);

    sessionStorage.setItem("&^*", JSON.stringify({ isAuth: false }));

    Navigate(HOME + "login");
  };

  let y = import.meta.env.MODE;
  const T = y === "development" ? "" : "/ad-min";

  const popover = usePopover();

  return (
    <>
      <IconButton
        size="small"
        onClick={popover.onOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar src={T + account.photoURL} alt="photoURL" />
      </IconButton>

      <CustomPopover
        arrow="none"
        sx={{ width: 200 }}
        open={popover.open}
        onClose={popover.onClose}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              sx={{
                "&:hover": { background: (theme) => theme.palette.grey[200] },
              }}
              key={option.label}
              onClick={handleClose}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          onClick={() => logoutHandler()}
          sx={{
            m: 1,
            "&:hover": { background: (theme) => theme.palette.grey[200] },
            fontWeight: 700,
            color: "red",
          }}
        >
          Logout
        </MenuItem>
      </CustomPopover>
    </>
  );
}
