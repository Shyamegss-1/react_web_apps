import { Container, Box, Typography, Button, Grid } from "@mui/material";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { WebTempleteCard } from "../../../components/webTempleteCard";

import cssContent from "../../../index.css?inline";

export default function Dashboard() {
  console.log(cssContent);

  return (
    <Container maxWidth="xl">
      <Box>
        <div className="km-sss"></div>
        <Typography variant="h1">Welcome On Board</Typography>
        <Typography paragraph mt={1} mb={4}>
          The sunflower bloomed brightly, casting its vibrant petals across the
          lush green meadow, captivating every passerby with its majestic
          beauty.The sunflower bloomed brightly, casting its vibrant petals
          across the lush green meadow, captivating every passerby with its
          majestic beauty.
        </Typography>

        <Button variant="contained" endIcon={<ArrowRightAltIcon />}>
          Create Your First content
        </Button>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Grid container spacing={2}>
          {TEMPLETEDATA.map((el) => (
            <Grid item key={el.image}>
              <WebTempleteCard img={el.image} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

const TEMPLETEDATA: { image: string }[] = [
  {
    image:
      "https://bloomui.com/wp-content/uploads/edd/tokyo-black-nextjs-typescript-mui-admin-dashboard.png",
  },
  {
    image:
      "https://bloomui.com/wp-content/uploads/edd/tokyo-white-nextjs-typescript-mui-admin-dashboard.png",
  },
  {
    image:
      "https://bloomui.com/wp-content/uploads/edd/tokyo-free-black-nextjs-javascript-mui-admin-dashboard.jpg",
  },
  {
    image:
      "https://bloomui.com/wp-content/uploads/edd/tokyo-black-nextjs-javascript-mui-admin-dashboard.png",
  },
  {
    image:
      "https://bloomui.com/wp-content/uploads/edd/tokyo-white-nextjs-javascript-mui-admin-dashboard.png",
  },
];
