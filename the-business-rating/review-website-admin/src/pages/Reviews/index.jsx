import React, { useState } from "react";
import Box from "@mui/material/Box";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

// * icons

import AddIcon from "@mui/icons-material/Add";

import CustomBreadcrumbs from "../../core/components/custom-breadcrumbs/custom-breadcrumbs";
import Department from "../../core/sections/department";
import { useSearchParams } from "react-router-dom";

export default function Index() {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useSearchParams();

  const openHandler = (type, id = "o") => {
    search.set("t", type);
    search.set("i", id);
    setSearch(search);
    setOpen(true);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" mt={10}>
          <CustomBreadcrumbs
            heading="Edit"
            links={[
              {
                name: "Reviews",
                href: "#",
              },
            ]}
            sx={{
              mb: { xs: 3, md: 5 },
            }}
          />

          <Box></Box>
        </Stack>

        <Department setOpen={setOpen} open={open} openHandler={openHandler} />
      </Container>
    </>
  );
}
