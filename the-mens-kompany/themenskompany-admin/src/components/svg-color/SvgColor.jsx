import PropTypes from "prop-types";
import { forwardRef } from "react";
// @mui
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

const SvgColor = forwardRef(({ src, sx, ...other }, ref) => {
  let y = import.meta.env.MODE;
  const T = y === "development" ? "/navbar/" : "/ad-min/navbar/";

  return (
    <Box
      component="span"
      className="svg-color"
      ref={ref}
      sx={{
        width: 24,
        height: 24,
        display: "inline-block",
        bgcolor: "currentColor",
        mask: `url(${T + src}.svg) no-repeat center / contain`,
        WebkitMask: `url(${T + src}.svg) no-repeat center / contain`,
        ...sx,
      }}
      {...other}
    />
  );
});

SvgColor.propTypes = {
  src: PropTypes.string,
  sx: PropTypes.object,
};

export default SvgColor;
