import { Outlet } from "react-router-dom";
import SideLayout from "../../components/sidebar";
import { List, styled } from "@mui/material";

import DashboardNav from "../../components/dashboard-nav";
import Logo from "../../components/dashboard-nav/logo";

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const APP_BAR_MOBILE = 14;
const APP_BAR_DESKTOP = 22;

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE,
  paddingBottom: APP_BAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default function DashboardLayout() {
  return (
    <StyledRoot>
      <SideLayout>
        <List>
          <Logo />

          <DashboardNav data={[]} />
        </List>
      </SideLayout>

      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
