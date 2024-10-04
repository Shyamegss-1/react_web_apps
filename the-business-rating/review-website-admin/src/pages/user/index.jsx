import React, { useState } from "react";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

// * icons

import CustomBreadcrumbs from "../../core/components/custom-breadcrumbs/custom-breadcrumbs";
import Category from "../../core/sections/categories";
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
            heading="User list"
            links={[
              {
                name: "User",
                href: "#",
              },
            ]}
            sx={{
              mb: { xs: 3, md: 5 },
            }}
          />
        </Stack>

        <Category setOpen={setOpen} open={open} openHandler={openHandler} />
      </Container>
    </>
  );
}
