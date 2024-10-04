import { Helmet } from "react-helmet-async";
import React from "react";

// @mui
import {
  Grid,
  Container,
  Stack,
  Typography,
  Card,
  Button,
  Snackbar,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import BlogCardMedia from "./cardMedia";
import CatePanel from "../BlogEdit/BlogEditiorPanel";
import { useSearchParams, NavLink, useNavigate } from "react-router-dom";

import { BLOG } from "../../../constants/route-path";

const StyledCard = styled(Card)(({ theme }) => ({
  padding: "2em",
}));

// ----------------------------------------------------------------------

export default function Index() {
  const Navigate = useNavigate();

  const [popup, setPopup] = React.useState({
    save: false,
    delete: false,
  });

  const [isValid, setIsValid] = React.useState(false);

  const [blogId] = useSearchParams();

  const [editBlogData, setEditBlogData] = React.useState({
    post_name: null,
    post_description: null,
    post_date: null,
    post_img: null,
    post_slug: null,
    meta_title: null,
    meta_description: null,
    meta_keywords: null,
  });

  return (
    <>
      <Helmet>
        <title> Dashboard: edit | sessun </title>
      </Helmet>

      <Snackbar
        open={popup.save}
        autoHideDuration={6000}
        onClose={() => setPopup({ save: false })}
        message="Blog Updated Sucessfully"
        action={
          <Button onClick={() => setPopup({ save: false })}>close</Button>
        }
      />

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            {blogId.get("edit") ? "Edit Blog" : "Add Blog"}
          </Typography>
        </Stack>

        <StyledCard>
          <Grid container justifyContent="space-between">
            <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
              <BlogCardMedia
                blogData={editBlogData}
                editData={setEditBlogData}
                valid={isValid}
              />
            </Grid>

            <Grid
              item
              xl={6}
              lg={6}
              md={6}
              sm={12}
              mt={{ xl: 0, lg: 0, md: 0, sm: 10 }}
              xs={12}
            >
              <CatePanel
                blogData={editBlogData}
                editData={setEditBlogData}
                valid={isValid}
              />
            </Grid>
          </Grid>

          <Stack spacing={2} mt={2} direction={"row"} justifyContent="flex-end">
            <Button variant="contained" size="large">
              Save
            </Button>

            <Button
              variant="contained"
              to={BLOG}
              LinkComponent={NavLink}
              size="large"
            >
              cancel
            </Button>

            {blogId.get("edit") ? (
              <Button variant="contained" color="error" size="large">
                Delete
              </Button>
            ) : (
              ""
            )}
          </Stack>
        </StyledCard>
      </Container>
    </>
  );
}
