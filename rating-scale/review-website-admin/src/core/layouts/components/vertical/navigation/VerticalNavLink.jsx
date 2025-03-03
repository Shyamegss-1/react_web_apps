// ** Next Imports

// ** MUI Imports
import Chip from "@mui/material/Chip";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";

// ** Configs Import
import themeConfig from "../../../../../config/themeConfig";

// ** Custom Components Imports
import UserIcon from "../../../../../layouts/components/UserIcon";

// ** Utils
import { Link, useLocation } from "react-router-dom";

// ** Styled Components
const MenuNavLink = styled(ListItemButton)(({ theme }) => ({
  width: "100%",
  borderRadius: 100,
  marginLeft: "10px",
  color: theme.palette.text.primary,
  padding: theme.spacing(2.25, 3.5),
  transition: "opacity .25s ease-in-out",
  "&.active, &.active:hover": {
    boxShadow: theme.shadows[3],
    backgroundColor: `#7053C1`,
  },
  "&.active .MuiTypography-root, &.active .MuiSvgIcon-root": {
    color: `${theme.palette.common.white} !important`,
  },
}));

const MenuItemTextMetaWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  transition: "opacity .25s ease-in-out",
  ...(themeConfig.menuTextTruncate && { overflow: "hidden" }),
});

const VerticalNavLink = ({ item, navVisible, toggleNavVisibility }) => {
  // ** Hooks
  const router = useLocation();
  const IconTag = item.icon;

  const isNavLinkActive = () => {
    if (router.pathname === item.path) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <ListItem
      disablePadding
      className="nav-link"
      disabled={item.disabled || false}
      sx={{ mt: 1.5, px: "0 !important" }}
    >
      <MenuNavLink
        to={item.path === undefined ? "/admin" : `${item.path}`}
        component={Link}
        className={isNavLinkActive() ? "active" : ""}
        {...(item.openInNewTab ? { target: "_blank" } : null)}
        onClick={(e) => {
          if (item.path === undefined) {
            e.preventDefault();
            e.stopPropagation();
          }
          if (navVisible) {
            toggleNavVisibility();
          }
        }}
        sx={{
          pl: 5.5,
          ...(item.disabled
            ? { pointerEvents: "none" }
            : { cursor: "pointer" }),
        }}
      >
        <ListItemIcon
          sx={{
            mr: 2.5,
            color: "text.primary",
            transition: "margin .25s ease-in-out",
          }}
        >
          <UserIcon icon={IconTag} />
        </ListItemIcon>

        <MenuItemTextMetaWrapper>
          <Typography {...(themeConfig.menuTextTruncate && { noWrap: true })}>
            {item.title}
          </Typography>
          {item.badgeContent ? (
            <Chip
              label={item.badgeContent}
              color={item.badgeColor || "primary"}
              sx={{
                height: 20,
                fontWeight: 500,
                marginLeft: 1.25,
                "& .MuiChip-label": { px: 1.5, textTransform: "capitalize" },
              }}
            />
          ) : null}
        </MenuItemTextMetaWrapper>
      </MenuNavLink>
    </ListItem>
  );
};

export default VerticalNavLink;
