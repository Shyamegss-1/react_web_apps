import { Box, Card, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import UserTable from "../../sections/@users/userTable";
import { userService } from "../../../services/apiServices/apiService";

export default function user() {
  const [state, setstate] = useState([]);

  useEffect(() => {
    userService().then((e) => setstate(e.data.data));
  }, []);

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Users List
        </Typography>
      </Stack>

      <Card>
        <UserTable user={state} />
      </Card>
    </Container>
  );
}
