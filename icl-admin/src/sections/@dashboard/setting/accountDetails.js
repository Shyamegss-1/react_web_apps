import React from "react";

// @mui
import {
  Card,
  CardContent,
  CardHeader,
  Box,
  TextField,
  Button,
  CardActions,
} from "@mui/material";

const AccountDetails = () => {
  return (
    <Card>
      <CardHeader title="Account Details" />

      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField type="text" size="small" label="email" />
          <TextField type="text" size="small" label="phone" />
          <textarea
            cols={40}
            rows={9}
            placeholder="Address"
            style={{
              outline: "none",
              borderRadius: "5px",
              borderColor: "#DCE0E4",
              resize: "none",
              padding: "12px",
            }}
          />
        </Box>
      </CardContent>

      <CardActions>
        <Button size="small">Save</Button>
      </CardActions>
    </Card>
  );
};

export default AccountDetails;
