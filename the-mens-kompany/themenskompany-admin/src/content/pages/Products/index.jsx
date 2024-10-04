import React, { useEffect, useState } from "react";

// @mui

import { Button, Container, Stack, Typography } from "@mui/material";
import ProductList from "../../sections/@products/ProductList";
import { productRandService } from "../../../services/apiServices/apiService";

// components

export default function index() {
  const [state, setstate] = useState([]);

  useEffect(() => {
    productRandService().then((e) => setstate(e.data.data));
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
          Products
        </Typography>
      </Stack>

      <ProductList products={state} />
    </Container>
  );
}
