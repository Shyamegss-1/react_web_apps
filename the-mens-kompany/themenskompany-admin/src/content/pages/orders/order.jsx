import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderTable from "../../sections/@order/orderTable";
import { orderService } from "../../../services/apiServices/apiService";
import OrderDetails from "../../sections/@order/OrderDetails";

export default function Order() {
  const [state, setstate] = useState([]);
  const [open, setOpen] = useState(false);

  const [orderPreview, setOrderPreview] = useState({});

  useEffect(() => {
    orderService().then((e) => setstate(e.data.data));
  }, []);

  let onClose = () => {
    setOpen(false);
  };

  const onOpenHandler = (value) => {
    setOpen(true);

    const filterdOrder = state.filter((e) => e.id === value);
    setOrderPreview(filterdOrder[0]);
  };

  return (
    <Container maxWidth="xl">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Orders
        </Typography>
      </Stack>
      <OrderTable orders={state} onOpenHandler={onOpenHandler} />

      <OrderDetails open={open} orderPreview={orderPreview} onClose={onClose} />
    </Container>
  );
}
