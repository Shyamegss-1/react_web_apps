import { Helmet } from "react-helmet-async";
import React from "react";

// @mui
import { Container, Stack, Typography, Button, Snackbar } from "@mui/material";

import { OrderTable } from "../sections/@dashboard/order";

export default function Order() {
  const [popup, setPopup] = React.useState(false);

  return (
    <>
      <Helmet>
        <title> Dashboard: Order | ikshita Choudhary </title>
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

      <Container sx={{ maxWidth: "1300px !important" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Order
          </Typography>
        </Stack>

        <OrderTable />
      </Container>
    </>
  );
}
