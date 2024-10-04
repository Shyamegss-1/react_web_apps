import { Typography, Box } from "@mui/material";
import { HeaderLogo } from "./styles";

import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";

export default function Logo() {
  return (
    <HeaderLogo>
      <AutoAwesomeMosaicIcon
        sx={{ width: "2em", height: "2em" }}
        color="primary"
      />

      <Box sx={{ pl: 2 }}>
        <Typography color="white" variant="h4">
          Dashboard
        </Typography>

        <Typography color="white" variant="inherit">
          Workplace
        </Typography>
      </Box>
    </HeaderLogo>
  );
}
