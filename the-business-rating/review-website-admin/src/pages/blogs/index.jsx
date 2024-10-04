import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

// * hook

import { useSelector } from "react-redux";

import BlogCard from "../../core/sections/blogs/BlogCard";
import useOnceEffect from "../../core/hooks/useOnce";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

// * icons

import AddIcon from "@mui/icons-material/Add";

import CustomBreadcrumbs from "../../core/components/custom-breadcrumbs/custom-breadcrumbs";

import { Grid, Box } from "@mui/material";
import { getBlogData } from "../../services/operations/blog";

import Button from "@mui/material/Button";

export default function Index() {
  const { token, loading } = useSelector((e) => e.auth);

  const navigate = useNavigate();

  const [state, setState] = useState([]);

  useOnceEffect(async () => {
    const data = await getBlogData(token, navigate, true);
    setState(data);
  }, [loading]);

  return (
    <>
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" mt={10}>
          <CustomBreadcrumbs
            heading="Blog list"
            links={[
              {
                name: "Dashboard",
                href: "/admin",
              },
              {
                name: "blog",
                href: "#",
              },
            ]}
            sx={{
              mb: { xs: 3, md: 5 },
            }}
          />

          <Box>
            <Button
              onClick={() => navigate("/admin/blog/edit/1")}
              startIcon={<AddIcon />}
              variant="contained"
            >
              Add
            </Button>

            <Button
              onClick={() => navigate("/admin/blog/category")}
              startIcon={<AddIcon />}
              variant="contained"
              sx={{ ml: 3 }}
            >
              Add Category
            </Button>
          </Box>
        </Stack>

        <Grid container spacing={3}>
          {state.map((blog, index) => {
            return (
              <Grid key={index} item md={4} sm={6} xs={12}>
                <BlogCard data={blog} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
