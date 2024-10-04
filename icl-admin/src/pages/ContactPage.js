import { Helmet } from "react-helmet-async";
import React from "react";

// @mui
import { Container, Stack, Typography, Button, Snackbar } from "@mui/material";
import ContactTable from "../sections/@dashboard/contact/table";

// components

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function ContactPage() {
  const [popup, setPopup] = React.useState(false);

  return (
    <>
      <Helmet>
        <title> Dashboard: Contact | ikshita Choudhary </title>
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
            Contact
          </Typography>
        </Stack>

        <ContactTable />
      </Container>
    </>
  );
}
