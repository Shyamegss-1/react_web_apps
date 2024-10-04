import React, { useEffect, useRef } from "react";

import { Helmet } from "react-helmet-async";

// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography, Card } from "@mui/material";

// sections

import {
  AppWidgetSummary,
  AppWebsiteVisits,
  AppOrderTimeline,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates,
  AppCurrentVisits,
} from "../sections/@dashboard/app";

import { VISITSERVICE } from "../services/apiServices/apiService";
import Iconify from "../components/iconify/Iconify";
import { faker } from "@faker-js/faker";
import AppProductsRanking from "../sections/@dashboard/app/AppProductsRanking";

// ----------------------------------------------------------------------

export default function Home() {
  const [state, seState] = React.useState({
    month: [],
    visit: [],
  });

  React.useEffect(() => {
    let visits = [];
    let month = [];

    VISITSERVICE({ method: "GET" }).then((e) => {
      e.data.map((e) => {
        month.push(e.month);
        visits.push(Number(e.count));
      });
    });

    seState({
      month: month,
      visit: visits,
    });
  }, []);

  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Sessun | Admin ikshita Choudhary </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Products"
              total={714000}
              icon={"game-icons:ample-dress"}
            />
          </Grid>

          {/* <Grid item xs={12} sm={6} md={3}>
            <video
              id="vieo"
              width="320"
              height="240"
              controls="controls autoplay"
            >
              <source src="http://localhost:3001/stream" type="video/mp4" />
            </video>

            <button onClick={playVideo}>Play</button>
          </Grid> */}

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="New Users"
              total={1352831}
              color="info"
              icon={"mdi:user"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Item Orders"
              total={1723315}
              color="warning"
              icon={"material-symbols:list-alt"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Weekly Sale"
              total={234}
              color="error"
              icon={"material-symbols:shopping-bag"}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Top Landing Pages"
              subheader="(+43%) than last year"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: "Desktop", value: 7144 },
                { label: "Mobile", value: 4435 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Top Landing Pages"
              subheader="(+43%) than last year"
              chartData={[
                { label: "/", value: 1800 },
                { label: "/Shop", value: 1100 },
                { label: "/About", value: 1200 },
                { label: "/details", value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <Card sx={{ height: "534px" }}>
              <spline-viewer
                hint
                loading-anim
                url="https://prod.spline.design/LmIgT2LSe-oTrnbb/scene.splinecode"
              ></spline-viewer>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={[
                "English",
                "History",
                "Physics",
                "Geography",
                "Chinese",
                "Math",
              ]}
              chartData={[
                { name: "Series 1", data: [80, 50, 30, 40, 100, 20] },
                { name: "Series 2", data: [80, 30, 40, 80, 20, 80] },
                { name: "Series 3", data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(
                () => theme.palette.text.secondary
              )}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Orders Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  "1983, orders, $4220",
                  "12 Invoices have been paid",
                  "Order #37745 from September",
                  "New order placed #XF-2356",
                  "New order placed #XF-2346",
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppProductsRanking />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: "FaceBook",
                  value: 323234,
                  icon: (
                    <Iconify
                      icon={"eva:facebook-fill"}
                      color="#1877F2"
                      width={32}
                    />
                  ),
                },
                {
                  name: "Google",
                  value: 341212,
                  icon: (
                    <Iconify
                      icon={"eva:google-fill"}
                      color="#DF3E30"
                      width={32}
                    />
                  ),
                },
                {
                  name: "Linkedin",
                  value: 411213,
                  icon: (
                    <Iconify
                      icon={"eva:linkedin-fill"}
                      color="#006097"
                      width={32}
                    />
                  ),
                },
                {
                  name: "Twitter",
                  value: 443232,
                  icon: (
                    <Iconify
                      icon={"eva:twitter-fill"}
                      color="#1C9CEA"
                      width={32}
                    />
                  ),
                },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
