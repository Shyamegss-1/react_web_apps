import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";
import { faker } from "@faker-js/faker";
import SwiperComponent from "./Swiper";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const getRandomImageUrl = () => {
  const randomString = Math.random().toString(36).substring(7);
  return `https://source.unsplash.com/random/500x500/?nature&${randomString}.webp`;
};

const Index = () => {
  const [state, setState] = useState<string[]>([]);

  useEffect(() => {
    setState([...Array(5)].map(() => getRandomImageUrl()));

    return () => setState([]);
  }, []);

  let vari = faker.address.state();
  return (
    <Link to={`room/124/${vari}`}>
      <Box>
        <Card elevation={0}>
          <Box
            className="boxTr"
            sx={{ borderRadius: "15px", overflow: "hidden" }}
          >
            <SwiperComponent picutreData={state} />
          </Box>

          <CardContent sx={{ p: "10px 0" }}>
            <Stack
              width="100%"
              justifyContent="space-between"
              flexDirection="row"
              alignItems="center"
            >
              <Typography sx={{ fontWeight: "700" }} variant="inherit" noWrap>
                {vari}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <StarIcon fontSize="small" />
                &nbsp;
                <Typography variant="subtitle1">4.9</Typography>
              </Box>
            </Stack>

            <Typography fontSize="15px" color={"gray"} variant="inherit" mb={0}>
              {faker.random.numeric(3)} kilometers away
            </Typography>

            <Typography
              fontSize="15px"
              color="gray"
              variant="inherit"
              gutterBottom
            >
              4-10 days
            </Typography>

            <Typography variant="inherit">
              <span style={{ fontWeight: "700" }}>
                $ {faker.commerce.price()}
              </span>
              &nbsp;night
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Link>
  );
};

export default Index;
