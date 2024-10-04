// @mui
import { alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// theme
import { bgGradient } from "../../../../../theme/globalStyles";
// ----------------------------------------------------------------------

export default function PostDetailsHero({ title, coverUrl }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: 480,
        overflow: "hidden",
        ...bgGradient({
          imgUrl: coverUrl,
          startColor: `${alpha(theme.palette.grey[900], 0.64)} 0%`,
          endColor: `${alpha(theme.palette.grey[900], 0.64)} 100%`,
        }),
      }}
    >
      <Container sx={{ height: 1, position: "relative" }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            zIndex: 9,
            color: "common.white",
            position: "absolute",
            maxWidth: 580,
            pt: { xs: 2, md: 8 },
          }}
        >
          {title}
        </Typography>
      </Container>
    </Box>
  );
}
