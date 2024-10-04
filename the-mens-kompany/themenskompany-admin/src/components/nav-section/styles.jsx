// @mui
import { styled } from "@mui/material/styles";
import { ListItemIcon, ListItemButton } from "@mui/material";

// ----------------------------------------------------------------------

export const StyledNavItem = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 44,
  position: "relative",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
  borderRadius: "8px",
  margin: "0px 0px 4px",
  "&:hover": {
    background: "rgba(118, 53, 220, 0.16) !important",
  },
}));

export const StyledCollpNavItem = styled((props) => (
  <ListItemButton disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 36,
  position: "relative",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
  borderRadius: "8px",
  margin: "0 8px 4px 12px",
  "&:hover": {
    background: "rgba(145, 158, 171, 0.08) !important",
  },
}));

export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
