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
  Select,
  MenuItem,
  Card,
  CardContent,
  TextField,
} from "@mui/material";

export default function SeoPage() {
  const [popup, setPopup] = React.useState(false);
  const [state, setState] = React.useState("select");

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

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            S.E.O
          </Typography>
        </Stack>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ width: "30%" }}>
            <Select
              defaultValue={"select"}
              fullWidth
              onChange={(e) => setState(e.target.value)}
            >
              <MenuItem value="select">select page</MenuItem>
              <MenuItem value="Shop">Shop</MenuItem>
              <MenuItem value="About">About</MenuItem>
              <MenuItem value="Home">Home</MenuItem>
            </Select>
          </Box>

          <Box width="60%">
            <Card>
              <Box sx={{ p: "24px", pb: 0, fontSize: "20px" }}>
                Inner SEO , {state} page
              </Box>

              <CardContent
                sx={{ display: "flex", gap: 2, flexDirection: "column" }}
              >
                <TextField fullWidth label="title" size="small" />

                <TextField fullWidth label="Keyword" size="small" />

                <textarea
                  cols={40}
                  rows={17}
                  placeholder="Address"
                  style={{
                    outline: "none",
                    borderRadius: "5px",
                    borderColor: "#DCE0E4",
                    resize: "none",
                    padding: "12px",
                  }}
                />
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </>
  );
}
