import { Box, Card, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { paymentService } from "../../../services/apiServices/apiService";
import PaymentTable from "../../sections/@payments/paymentTable";
import FallBack from "../../../routes/fallBack";

export default function index() {
  const [state, setstate] = useState([]);

  useEffect(() => {
    paymentService().then((e) => setstate(e.data.data));
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
          Order payments
        </Typography>
      </Stack>

      <Card>
        <PaymentTable user={state} />
      </Card>
    </Container>
  );
}
