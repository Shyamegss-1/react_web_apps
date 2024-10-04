import { Box } from "@mui/material";
import React, { forwardRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Image = forwardRef(({ src, alt }, ref) => {
  let y = import.meta.env.MODE;
  const T = y === "development" ? "" : "/ad-min";

  const content = (
    <Box
      component={LazyLoadImage}
      src={src}
      alt={alt}
      effect="blur"
      useIntersectionObserver
      placeholderSrc={`${T}/placeholder.svg`}
      wrapperClassName={"component-image-wrapper"}
      sx={{
        width: 1,
        height: 1,
        objectFit: "cover",
        verticalAlign: "bottom",
      }}
    />
  );

  return (
    <Box
      component="span"
      className="component-image"
      sx={{
        overflow: "hidden",
        position: "relative",
        verticalAlign: "bottom",
        display: "inline-block",
        height: "100%",
        "border-radius": "12px",
        "& span.component-image-wrapper": {
          width: "100%",
          height: "100%",
          verticalAlign: "bottom",
          backgroundSize: "cover !important",
        },
      }}
      ref={ref}
    >
      {content}
    </Box>
  );
});

export default Image;
