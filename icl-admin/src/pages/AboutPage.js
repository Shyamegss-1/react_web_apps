import { Helmet } from "react-helmet-async";
import React from "react";

// @mui
import {
  Grid,
  Container,
  Stack,
  Typography,
  Card,
  Button,
  Snackbar,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

// components
// mock

import Iconify from "../components/iconify";
import LanguagePopover from "../layouts/dashboard/header/LanguagePopover";

import AboutMedia from "../sections/@dashboard/about/aboutMedia";
import AboutContent, {
  AboutContentEditior,
} from "../sections/@dashboard/about/aboutContent";
import { ABOUTSERVICE } from "../services/apiServices/apiService";
import Index from "../components/PageLoader/index";

// ----------------------------------------------------------------------

const StyledCardMedia = styled(Card)(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
  padding: "2em",
}));

// ----------------------------------------------------------------------

export default function AboutPage() {
  const [popup, setPopup] = React.useState(false);
  const [editiorPanel, setEditiorPanel] = React.useState(false);
  const [aboutData, setAboutData] = React.useState({
    image: null,
    content: null,
  });

  React.useEffect(() => {
    ABOUTSERVICE({ method: "GET" }).then((e) => {
      setAboutData({ image: e.data[0].img, content: e.data[0].content });
    });
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard: about | ikshita Choudhary </title>
      </Helmet>

      <Snackbar
        open={popup}
        autoHideDuration={6000}
        onClose={() => setPopup(false)}
        message="Content Updated Sucessfully"
        action={
          <Button onClick={() => setPopup({ save: false })}>close</Button>
        }
      />

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            About
          </Typography>
        </Stack>

        {aboutData.image ? (
          <StyledCardMedia>
            <Grid container spacing={3}>
              <Grid item xl={12} lg={12} sm={12} md={12} xs={12}>
                <AboutMedia
                  setPopup={setPopup}
                  EditiorPanel={setEditiorPanel}
                  aboutData={aboutData}
                  setAboutData={setAboutData}
                />
              </Grid>

              <Grid item xl={12}>
                {editiorPanel ? (
                  <AboutContentEditior
                    Data={aboutData}
                    closer={setEditiorPanel}
                    setPopup={setPopup}
                    setAboutData={setAboutData}
                  />
                ) : (
                  <AboutContent Data={aboutData} />
                )}
              </Grid>
            </Grid>
          </StyledCardMedia>
        ) : (
          <Index />
        )}
      </Container>
    </>
  );
}
