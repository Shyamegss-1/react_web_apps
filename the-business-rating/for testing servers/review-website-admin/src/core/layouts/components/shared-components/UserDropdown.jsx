import { useState, Fragment } from "react";

import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import CogOutline from "mdi-material-ui/CogOutline";
import LogoutVariant from "mdi-material-ui/LogoutVariant";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogoutHandler } from "../../../../services/operations/authApi";

const BadgeContentSpan = styled("span")(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

const UserDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const Navigate = useNavigate();

  const handleDropdownClose = (url) => {
    setAnchorEl(null);

    if (url) {
      Navigate(url);
    }
  };

  const styles = {
    py: 2,
    px: 4,
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

  const MODE = import.meta.env.MODE;
  let uri = MODE === "development" ? "" : "/admin";

  return (
    <Fragment>
      <Badge
        overlap="circular"
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: "pointer" }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Avatar
          alt="John Doe"
          onClick={handleDropdownOpen}
          sx={{ width: 40, height: 40 }}
          src={`${uri}/images/avatars/1.png`}
        />
      </Badge>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ "& .MuiMenu-paper": { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Badge
              overlap="circular"
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Avatar
                alt="John Doe"
                src={`${uri}/images/avatars/1.png`}
                sx={{ width: "2.5rem", height: "2.5rem" }}
              />
            </Badge>

            <Box
              sx={{
                display: "flex",
                marginLeft: 3,
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>Admin</Typography>
            </Box>
          </Box>
        </Box>

        <Divider />
        <MenuItem
          sx={{ py: 2 }}
          onClick={() => dispatch(LogoutHandler(navigate))}
        >
          <LogoutVariant
            sx={{
              marginRight: 2,
              fontSize: "1.375rem",
              color: "text.secondary",
            }}
          />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default UserDropdown;
