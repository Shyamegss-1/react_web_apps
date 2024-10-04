import React from "react";
import Container from "@mui/material/Container";

import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { styled, useTheme } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import useOnceEffect from "../../core/hooks/useOnce";

import AppWidgetSummary from "../../core/sections/dashboard/AppWidgetSummary";

import { StatsHandler } from "../../services/operations/authApi";
import UserChart from "./charts/userChart";
import ListingChart from "./charts/listingChart";

export default function Index() {
  const { token } = useSelector((e) => e.auth);

  const navigate = useNavigate();

  const theme = useTheme();

  const [state, setState] = React.useState({});

  useOnceEffect(async () => {
    const result = await StatsHandler(token, navigate, true);

    setState(result);
  }, []);

  return (
    <>
      {state.blogs && (
        <Container maxWidth="xl">
          <Box sx={{ mb: 15 }}>
            <Typography variant="h3" color="black" fontWeight={600}>
              Hi Admin, Welcome Back 👋
            </Typography>
          </Box>

          <Grid container spacing={3} mb={10} rowSpacing={{ md: 8, xs: 5 }}>
            <Grid item md={3} sm={6} xs={12}>
              <AppWidgetSummary
                icon={"/images/icons/user-icon.svg"}
                title={"Total users"}
                total={
                  state?.users[1]?.total + state?.users[0]?.total
                    ? +state?.users[1]?.total + +state?.users[0]?.total
                    : state?.users[0]?.total
                }
              />
            </Grid>

            <Grid item md={3} sm={6} xs={12}>
              <AppWidgetSummary
                icon={"/images/icons/verified-icon.svg"}
                title={"Verified users"}
                total={state?.users[0]?.total}
              />
            </Grid>

            <Grid item md={3} sm={6} xs={12}>
              <AppWidgetSummary
                icon={"/images/icons/unverified-icon.svg"}
                title={"unverified users"}
                total={state?.users[1]?.total ?? 0}
              />
            </Grid>

            <Grid item md={3} sm={6} xs={12}>
              <AppWidgetSummary
                icon={"/images/icons/listing-icon.svg"}
                title={"Total Listing"}
                total={
                  +state?.listings[1]?.total + +state?.listings[0]?.total || 0
                }
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} mb={10} rowSpacing={{ md: 8, xs: 5 }}>
            <Grid item md={3} sm={6} xs={12}>
              <AppWidgetSummary
                icon={"/images/icons/claimed-icon.svg"}
                title={"Claimed Listing"}
                total={state?.listings[0]?.total}
              />
            </Grid>

            <Grid item md={3} sm={6} xs={12}>
              <AppWidgetSummary
                icon={"/images/icons/unclaimed-icon.svg"}
                title={"Unclaimed Listing"}
                total={state?.listings[1]?.total}
              />
            </Grid>

            <Grid item md={3} sm={6} xs={12}>
              <AppWidgetSummary
                icon={"/images/icons/blog-icon.svg"}
                title={"Total Blogs"}
                total={state?.blogs}
              />
            </Grid>

            <Grid item md={3} sm={6} xs={12}>
              <AppWidgetSummary
                icon={"/images/icons/review-icon.svg"}
                title={"Reviews"}
                total={state?.reviews}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} mb={10} rowSpacing={{ md: 8, xs: 5 }}>
            <Grid item md={6} sm={6} xs={12}>
              <UserChart
                data={[+state?.users[0]?.total, +state?.users[1]?.total]}
              />
            </Grid>

            <Grid item md={6} sm={6} xs={12}>
              <ListingChart
                data={[+state?.listings[0]?.total, +state?.listings[1]?.total]}
              />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}
