import { Box } from "@mui/material";
import React from "react";

export default function SideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const NAV_WIDTH = 280;

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
        background: (theme) => theme.colors.purpleShade.dark,
        position: "relative",
      }}
    >
      {children}
    </Box>
  );
}
