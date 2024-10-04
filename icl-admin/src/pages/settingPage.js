import { Helmet } from "react-helmet-async";
import React, { useEffect } from "react";
// import $ from "jquery";

// @mui
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import ImgHandler from "../sections/@dashboard/setting/imgHandler";

import SocialLinks from "../sections/@dashboard/setting/socialLinks";
import AccountDetails from "../sections/@dashboard/setting/accountDetails";

export default function SettingPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: subscribe | ikshita Choudhary </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Setting
          </Typography>
        </Stack>

        <Box>
          <Grid container flexDirection="row" gap={2}>
            <Grid item md={3}>
              <ImgHandler />
            </Grid>

            <Grid item>
              <Card>
                <CardHeader title="Social Accounts" />

                <CardContent>
                  {[...Array(5)].map((e) => (
                    <SocialLinks key={e} />
                  ))}
                </CardContent>
              </Card>
            </Grid>

            <Grid item>
              <AccountDetails />
            </Grid>

            {[1, 2, 3].map((e) => (
              <Grid item key={e}>
                <Card>
                  <CardHeader title="Header " />
                  <CardContent>
                    <textarea
                      cols={40}
                      rows={9}
                      placeholder="Address"
                      style={{
                        outline: "none",
                        borderRadius: "5px",
                        borderColor: "#955cfd",
                        resize: "none",
                        padding: "12px",
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
