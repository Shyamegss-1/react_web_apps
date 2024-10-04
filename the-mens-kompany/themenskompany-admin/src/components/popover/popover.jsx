import styled from "@emotion/styled";
import { Popover } from "@mui/material";
import React from "react";

export default function StyledPopover({
  id,
  open,
  anchorEl,
  onClose,
  children,
}) {
  return (
    <Styled
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      {children}
    </Styled>
  );
}

const Styled = styled(Popover)({
  "& .MuiPopover-paper": {
    backdropFilter: "blur(20px)",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backgroundRepeat: "no-repeat, no-repeat",
    backgroundPosition: "right top, left bottom",
    borderRadius: 8,
    padding: 4,
    overFlow: "inherit",
    width: "160px",
    backgroundSize: "50%,50%",
    backgroundImage:
      "url(https://minimals.cc/assets/cyan-blur.png),url(https://minimals.cc/assets/red-blur.png)",
  },
});
