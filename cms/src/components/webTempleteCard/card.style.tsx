import { Card, styled, Box } from "@mui/material";

export const StyledCard = styled(Card)(() => ({
  width: "100%",
  position: "relative",
  cursor: "pointer",
  "&::before": {
    background: "black",
    content: "''",
    width: "100%",
    position: "absolute",
    top: "0px",
    left: "0px",
    height: "100%",
    zIndex: 11,
    opacity: 0,
    transition: "opacity .2s ease-in-out",
  },
  "&:hover::before ": {
    display: "block",
    opacity: "0.5",
  },
  "&:hover .MuiBox-root": {
    opacity: 1,
  },
})) as typeof Card;

export const StyledCardContent = styled(Box)(() => ({
  zIndex: 111111,
  position: "absolute",
  opacity: 0,
  top: "40%",
  left: "28%",
  display: "flex",
  width: "46%",
  justifyContent: "space-between",
})) as typeof Box;
