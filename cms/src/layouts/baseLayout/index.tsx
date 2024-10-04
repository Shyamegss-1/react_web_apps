import { Outlet } from "react-router-dom";
import SideLayout from "../../components/sidebar";
import { Box, Divider, List, styled } from "@mui/material";
import NavSection, {
  BottomNavSection,
} from "../../components/nav-section/NavSection";
import config from "../../components/sidebar/config";
import Header from "../../components/header";

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const APP_BAR_MOBILE = 14;
const APP_BAR_DESKTOP = 100;

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE,
  paddingBottom: APP_BAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

const NAV_WIDTH = 280;

export default function BaseLayout() {
  return (
    <StyledRoot>
      <Header />

      <SideLayout>
        <Box>
          <List>
            <NavSection data={config} />
          </List>
        </Box>
        <Box
          sx={{
            position: "fixed",
            bottom: 5,
            width: NAV_WIDTH,
          }}
        >
          <Divider sx={{ background: "#2e367a", m: "8px 0" }} />

          <List sx={{ display: "flex" }}>
            <BottomNavSection />
          </List>
        </Box>
      </SideLayout>

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
