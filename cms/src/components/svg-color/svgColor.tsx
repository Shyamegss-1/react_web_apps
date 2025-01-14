import React, { forwardRef } from "react";
// @mui
import { Box, BoxProps } from "@mui/material";

// ---------------------------------------------------------------------

interface SvgColorProps extends BoxProps {
  src: string;
}

const SvgColor = forwardRef(function SvgColor(
  { src, sx, ...other }: SvgColorProps,
  ref: React.ForwardedRef<HTMLSpanElement>
) {
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
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
      {...other}
    />
  );
});

export default SvgColor;
