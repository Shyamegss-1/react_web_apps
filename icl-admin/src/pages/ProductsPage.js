import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";

// @mui

import { Button, Container, Stack, Typography } from "@mui/material";

// components

import { PRODUCTSERVICE } from "../services/apiServices/apiService";

import {
  ProductSort,
  ProductList,
  ProductFilterSidebar,
} from "../sections/@dashboard/products";

// mock

import Iconify from "../components/iconify/Iconify";
import { NavLink } from "react-router-dom";
import { PRODUCTEDIT } from "../constants/route-path";

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [data, setData] = useState([]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    PRODUCTSERVICE().then((e) => setData(e.data));
  }, []);

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | ikshita Choudhary </title>
      </Helmet>

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

          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            LinkComponent={NavLink}
            to={PRODUCTEDIT}
          >
            New Products
          </Button>
        </Stack>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />

            <ProductSort />
          </Stack>
        </Stack>

        <ProductList products={data} />
      </Container>
    </>
  );
}
