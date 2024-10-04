// @mui
import { styled } from "@mui/material/styles";
import { ListItemIcon, ListItemButton } from "@mui/material";

// ----------------------------------------------------------------------

export const StyledNavItem = styled((props) => (
  <ListItemButton disableGutters {...props} disableRipple />
))(({ theme }) => ({
  ...theme.typography.body2,
  height: 40,
  position: "relative",
  textTransform: "capitalize",
  color: "white",
  borderRadius: theme.shape.borderRadius,
  fontWeight: 500,
  letterSpacing: 0.71,
  "&:hover": {
    background: theme.colors.purpleShade.main,
  },
})) as typeof ListItemButton;

export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
