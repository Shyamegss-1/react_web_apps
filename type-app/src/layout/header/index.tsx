import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import LOGO from "../../assets/logo.svg";
import SearchBar from "./section/searchBar";
import LogoConver from "./section/Herderlogo";

import Fab from "@mui/material/Fab";
import MapIcon from "@mui/icons-material/Map";
import Usermenu from "./section/userMenu";

const Index = () => {
  return (
    <Box sx={{ borderBottom: "1px solid #e7e7e7", paddingBottom: "15px" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Box>
            <LogoConver Path={LOGO} width={10} sx={{ cursor: "pointer" }} />
          </Box>
        </Grid>

        <Grid item>
          <SearchBar />
        </Grid>

        <Grid item>
          <Usermenu />
        </Grid>
      </Grid>

      <Box sx={{ position: "fixed", bottom: 100, left: "50%", zIndex: "11" }}>
        <Fab variant="extended" size="large">
          Show Maps
          <MapIcon sx={{ ml: 1 }} />
        </Fab>
      </Box>
    </Box>
  );
};

export default Index;
