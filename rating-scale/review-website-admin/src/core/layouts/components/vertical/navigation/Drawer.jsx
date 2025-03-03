// ** MUI Imports
import { styled, useTheme } from "@mui/material/styles";
import MuiSwipeableDrawer from "@mui/material/SwipeableDrawer";

const SwipeableDrawer = styled(MuiSwipeableDrawer)({
  overflowX: "hidden",
  transition: "width .25s ease-in-out",
  "& ul": {
    listStyle: "none",
  },
  "& .MuiListItem-gutters": {
    paddingLeft: 4,
    paddingRight: 4,
  },
  "& .MuiDrawer-paper": {
    left: "unset",
    borderRight: "1px dashed #d4d4d4 !important",
    right: "unset",
    overflowX: "hidden",
    transition: "width .25s ease-in-out, box-shadow .25s ease-in-out",
  },
});

const Drawer = (props) => {
  // ** Props
  const { hidden, children, navWidth, navVisible, setNavVisible } = props;

  // ** Hook
  const theme = useTheme();

  // Drawer Props for Mobile & Tablet screens
  const MobileDrawerProps = {
    open: navVisible,
    onOpen: () => setNavVisible(true),
    onClose: () => setNavVisible(false),
    ModalProps: {
      keepMounted: true, // Better open performance on mobile.
    },
  };

  // Drawer Props for Desktop screens
  const DesktopDrawerProps = {
    open: true,
    onOpen: () => null,
    onClose: () => null,
  };

  return (
    <SwipeableDrawer
      className="layout-vertical-nav"
      variant={hidden ? "temporary" : "permanent"}
      {...(hidden ? { ...MobileDrawerProps } : { ...DesktopDrawerProps })}
      PaperProps={{ sx: { width: navWidth } }}
      sx={{
        width: navWidth,
        "& .MuiDrawer-paper": {
          borderRight: 0,
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      {children}
    </SwipeableDrawer>
  );
};

export default Drawer;
