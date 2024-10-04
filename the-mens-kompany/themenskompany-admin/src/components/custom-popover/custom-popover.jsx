// @mui
import { menuItemClasses } from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
//
import { getPosition } from "./utils";
import { StyledArrow } from "./style";
import styled from "@emotion/styled";

// ----------------------------------------------------------------------

export default function CustomPopover({
  open,
  children,
  arrow = "top-right",
  hiddenArrow,
  sx,
  width,
  ...other
}) {
  const { style, anchorOrigin, transformOrigin } = getPosition(arrow);

  return (
    <StyledPopover
      open={Boolean(open)}
      anchorEl={open}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      slotProps={{
        paper: {
          sx: {
            width: "auto",
            overflow: "inherit",
            ...style,
            [`& .${menuItemClasses.root}`]: {
              "& svg": {
                mr: 2,
                flexShrink: 0,
              },
            },
            ...sx,
          },
        },
      }}
      {...other}
    >
      {!hiddenArrow && <StyledArrow arrow={arrow} />}

      {children}
    </StyledPopover>
  );
}

const StyledPopover = styled(Popover)({
  "& .MuiPopover-paper": {
    backdropFilter: "blur(20px)",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backgroundRepeat: "no-repeat, no-repeat",
    backgroundPosition: "right top, left bottom",
    borderRadius: 8,
    padding: 4,
    overFlow: "inherit",
    backgroundSize: "50%,50%",
    backgroundImage:
      "url(https://minimals.cc/assets/cyan-blur.png),url(https://minimals.cc/assets/red-blur.png)",
    "& .MuiMenuItem-root": {
      borderRadius: "5px",
      fontSize: "13px",
      marginBottom: 2,
    },
  },
});
