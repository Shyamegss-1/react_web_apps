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

export default function SocialCards({
  links,
  saveHandler,
  changeHandler,
  isLoading,
}) {
  return (
    <>
      <Typography my={3} variant="h4" gutterBottom>
        Social Links
      </Typography>
      <Card sx={{ p: 2 }}>
        <TextField
          fullWidth
          label="Instagram"
          id="insta"
          sx={{ my: 3 }}
          onChange={(e) => changeHandler(e)}
          value={links.insta}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="mdi:instagram" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Facebook"
          id="face"
          sx={{ mb: 3 }}
          value={links.face}
          onChange={(e) => changeHandler(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify color="#1877F2" icon="basil:facebook-solid" />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          label="Twitter"
          id="twitter"
          sx={{ mb: 3 }}
          value={links.twitter}
          onChange={(e) => changeHandler(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify color="#1A8CD8" icon="mdi:twitter" />
              </InputAdornment>
            ),
          }}
        />

        <Stack direction="row" justifyContent="end">
          <Button
            disabled={isLoading}
            onClick={() =>
              saveHandler(1, `${links.insta},${links.face},${links.twitter},`)
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
