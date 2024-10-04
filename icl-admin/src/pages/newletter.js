import { Helmet } from "react-helmet-async";
import React from "react";

// @mui
import {
  Container,
  Stack,
  Typography,
  Button,
  Snackbar,
  Box,
} from "@mui/material";
import UserTable from "../sections/@dashboard/newsletter/userTable";

export default function SeoPage() {
  const [popup, setPopup] = React.useState(false);

  return (
    <>
      <Helmet>
        <title> Dashboard: subscribe | ikshita Choudhary </title>
      </Helmet>

      <Snackbar
        open={popup}
        autoHideDuration={6000}
        onClose={() => setPopup(false)}
        message="Content Updated Sucessfully"
        action={<Button onClick={() => setPopup(false)}>close</Button>}
      />

      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            News Letters / Email Templete
          </Typography>
        </Stack>

        <Box>
          <UserTable />
        </Box>
      </Container>
    </>
  );
}
