import {
  Button,
  Card,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import React from "react";

import Iconify from "../../../../components/iconify/Iconify";

export default function ContactdetailsCard({
  link,
  changeCdetailshanlder,
  saveHandler,
  isLoading,
}) {
  return (
    <>
      <Typography my={3} variant="h4" gutterBottom>
        Contact Details
      </Typography>

      <Card sx={{ p: 2, width: "500px" }}>
        <TextField
          fullWidth
          label="Phone"
          id="phone"
          sx={{ my: 3 }}
          onChange={(e) => changeCdetailshanlder(e)}
          value={link.phone}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="ic:baseline-phone" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Email"
          onChange={(e) => changeCdetailshanlder(e)}
          id="email"
          sx={{ mb: 3 }}
          value={link.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify color="#EA4335" icon="ic:baseline-email" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Address"
          id="address"
          sx={{ mb: 3 }}
          value={link.address}
          onChange={(e) => changeCdetailshanlder(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify color="black" icon="entypo:address" />
              </InputAdornment>
            ),
          }}
        />

        <Stack direction="row" justifyContent="end">
          <Button
            disabled={isLoading}
            onClick={() =>
              saveHandler(2, `${link.phone},${link.email},${link.address},`)
            }
            variant="contained"
            size="small"
          >
            {isLoading ? "updating" : "save"}
          </Button>
        </Stack>
      </Card>
    </>
  );
}
