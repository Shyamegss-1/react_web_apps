import React from "react";

// @mui
import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Typography,
  Button,
  Divider,
} from "@mui/material";

const ImgHandler = () => {
  return (
    <Card sx={{ "&:hover": { boxShadow: "none", cursor: "pointer" } }}>
      <CardContent>
        <CardHeader sx={{ p: "10px 0" }} title="Change Logo" />

        <Box
          sx={{
            p: 1,
            mt: "10px",
            border: "1px solid #955cfd",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "12px",
          }}
        >
          <Typography variant="h6">image</Typography>

          <Button variant="contained" component="label">
            Upload
            <input hidden accept="image/*" multiple type="file" />
          </Button>
        </Box>

        <Divider sx={{ m: "20px 0" }} />

        <CardHeader sx={{ p: "10px 0" }} title="Change favicon" />

        <Box
          sx={{
            p: 1,
            mt: "10px",
            border: "1px solid #955cfd",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "12px",
          }}
        >
          <Typography variant="h6">image</Typography>

          <Button variant="contained" component="label">
            Upload
            <input hidden accept="image/*" multiple type="file" />
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ImgHandler;
