import { Helmet } from "react-helmet-async";
import React, { useState } from "react";

// @mui
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
// components
import Iconify from "../components/iconify";

// ----------------------------------------------------------------------

export default function PaymentGatewayPage() {
  const [stripeView, setStripeView] = useState(false);

  const [paypalView, setPaypalView] = useState(false);
  const [paytmView, setPaytmView] = useState(false);

  return (
    <>
      <Helmet>
        <title> Dashboard: Blog | ikshita Choudhary </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Add payment gateway
          </Typography>
        </Stack>

        <Stack
          direction="column"
          alignItems="center"
          columnGap={3}
          rowGap={2}
          justifyContent="space-between"
        >
          <Card
            sx={{
              width: "80%",
            }}
          >
            <CardHeader
              title="Stripe Payment Gateway"
              action={
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="enable"
                />
              }
            />

            <CardContent>
              <Stack direction="row" columnGap={2}>
                <TextField
                  label="Client ID"
                  type="text"
                  defaultValue={"388fc931de96c3a224292f8edb95"}
                  sx={{ width: "50%" }}
                />

                <TextField
                  label="Secret"
                  type={!stripeView ? "password" : "text"}
                  sx={{ width: "50%" }}
                  defaultValue="6f1c09c6338593ec0ffc8419f7cb5ac302ce"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setStripeView(!stripeView)}>
                          <Iconify
                            icon={
                              !stripeView
                                ? "ic:baseline-remove-red-eye"
                                : "mdi:eye-off-outline"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </CardContent>
          </Card>

          <Card sx={{ width: "80%" }}>
            <CardHeader
              title="paypal Payment Gateway"
              action={<FormControlLabel control={<Switch />} label="enable" />}
            />

            <CardContent>
              <Stack direction="row" columnGap={2}>
                <TextField
                  label="Client ID"
                  type="text"
                  defaultValue={"388fc931de96c3a224292f8edb95"}
                  sx={{ width: "50%" }}
                />

                <TextField
                  label="Secret"
                  type={!paypalView ? "password" : "text"}
                  sx={{ width: "50%" }}
                  defaultValue="6f1c09c6338593ec0ffc8419f7cb5ac302ce"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setPaypalView(!paypalView)}>
                          <Iconify
                            icon={
                              !paypalView
                                ? "ic:baseline-remove-red-eye"
                                : "mdi:eye-off-outline"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </CardContent>
          </Card>

          <Card
            sx={{
              width: "80%",
            }}
          >
            <CardHeader
              title="Paytm Payment Gateway"
              action={<FormControlLabel control={<Switch />} label="enable" />}
            />

            <CardContent>
              <Stack direction="row" columnGap={2}>
                <TextField
                  label="Client ID"
                  type="text"
                  defaultValue={"388fc931de96c3a224292f8edb95"}
                  sx={{ width: "50%" }}
                />

                <TextField
                  label="Secret"
                  type={!paytmView ? "password" : "text"}
                  sx={{ width: "50%" }}
                  defaultValue="6f1c09c6338593ec0ffc8419f7cb5ac302ce"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setPaytmView(!paytmView)}>
                          <Iconify
                            icon={
                              !paytmView
                                ? "ic:baseline-remove-red-eye"
                                : "mdi:eye-off-outline"
                            }
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </>
  );
}

//   "&::before": false && {
//     content: "' '",
//     width: "100%",
//     height: "100vh",
//     padding: "61px 0",
//     textAlign: "center",
//     position: "absolute",
//     background: "#a1a1a173",
//     backdropFilter: "blur(0.61px);",
//     zIndex: "11",
//     cursor: "pointer",

//   },
