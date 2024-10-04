import { styled } from "@mui/material/styles";
import { ListItemIcon, ListItemButton, Box } from "@mui/material";

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

export const HeaderLogo = styled(Box)({
  display: "flex",
  border: "1px solid #262CB1",
  borderRadius: 6,
  padding: "17px 9px",
  margin: "30px 0",
  alignItems: "center",
}) as typeof Box;
