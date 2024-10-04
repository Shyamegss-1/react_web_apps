import { Helmet } from "react-helmet-async";
import React from "react";

// @mui
import {
  Grid,
  Button,
  Container,
  Stack,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
// components
import Iconify from "../components/iconify";
import { BlogPostCard } from "../sections/@dashboard/blog";
import Index from "../components/PageLoader/index";
// mock

import { BLOGSERVICE } from "../services/apiServices/apiService";
import { NavLink } from "react-router-dom";

// ----------------------------------------------------------------------

export default function BlogPage() {
  const [data, setData] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  React.useEffect(() => {
    BLOGSERVICE().then((e) => setData(e.data));
  }, []);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Blog | ikshita Choudhary </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>

          <Stack direction="row" spacing={2}>
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                variant="outlined"
              >
                Edit Page
              </Button>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                sx={{
                  "& .MuiMenu-paper": {
                    border: "1px solid #C5942C",
                  },
                  "& .MuiMenuItem-gutters:hover": {
                    background: "#e2a01342 !important",
                  },
                }}
              >
                <MenuItem onClick={handleClose}>Blog FAQs</MenuItem>

                <MenuItem onClick={handleClose}>Blog Category</MenuItem>
              </Menu>
            </div>

            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              LinkComponent={NavLink}
              to="/ikshitachoudhary/dashboard/edit-blog"
            >
              New Post
            </Button>
          </Stack>
        </Stack>

        {data.length >= 1 ? (
          <>
            <Grid container spacing={3}>
              {data.map((post, index) => (
                <BlogPostCard key={post.post_id} POST={post} />
              ))}
            </Grid>
          </>
        ) : (
          <Index />
        )}
      </Container>
    </>
  );
}
