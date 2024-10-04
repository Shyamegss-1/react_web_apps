import { Helmet } from "react-helmet-async";
import React from "react";

// @mui
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import BannerCard from "../sections/@dashboard/banner/bannerCard";
import { HOMEBANNER } from "../services/apiServices/apiService";

// components

import Index from "../components/PageLoader/index";
import { useNavigate } from "react-router-dom";
import Iconify from "../components/iconify/Iconify";
import { EDITHOMEBANNER } from "../constants/route-path";

// ----------------------------------------------------------------------

export default function HomeBanner() {
  const [state, setState] = React.useState([]);
  const Navigate = useNavigate();

  React.useEffect(() => {
    HOMEBANNER({ method: "GET" }).then((e) => setState(e.data));
  }, []);

  const setBannerDetail = () => {
    sessionStorage.setItem(
      "banner",
      JSON.stringify({
        id: null,
        img: null,
        heading: null,
        subHeading: null,
      })
    );

    Navigate(EDITHOMEBANNER);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Banner | ikshita Choudhary </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Banner
          </Typography>

          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={() => setBannerDetail()}
          >
            New Banner
          </Button>
        </Stack>

        {state.length != 0 ? (
          <Grid container spacing={4} justifyContent="space-between">
            {state.map((e) => (
              <BannerCard data={e} key={e.id} />
            ))}
          </Grid>
        ) : (
          <Index />
        )}
      </Container>
    </>
  );
}
