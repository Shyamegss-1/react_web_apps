import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { useTheme } from "@mui/material/styles";
import { Box, Link } from "@mui/material";
import { HOME } from "../../constants/route-path";

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 50,
        height: 30,
        display: "inline-flex",
        ...sx,
      }}
      {...other}
    >
      <img src={`https://themenskompany.com/images/logo.png`} alt="logo" />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to={HOME} component={RouterLink} sx={{ display: "contents" }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
