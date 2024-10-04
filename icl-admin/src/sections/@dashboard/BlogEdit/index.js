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
import BlogEditiorPanel, { BlogCkEditor } from "./BlogEditiorPanel";
import { useSearchParams, NavLink, useNavigate } from "react-router-dom";
import { BLOGDETAILSERVICE } from "../../../services/apiServices/apiService";
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

  React.useEffect(() => {
    BLOGDETAILSERVICE({ method: "GET", bId: blogId.get("edit") || 0 }).then(
      (e) => {
        setEditBlogData({
          ...editBlogData,
          post_name: e.data[0].post_name,
          post_description: e.data[0].post_description,
          post_date: e.data[0].post_date,
          post_img: e.data[0].post_img,
          post_slug: e.data[0].post_slug,
          meta_title: e.data[0].meta_title,
          meta_description: e.data[0].meta_description,
          meta_keywords: e.data[0].meta_keywords,
        });
      }
    );
  }, [blogId]);

  const updateHandler = () => {
    BLOGDETAILSERVICE({
      method: "UPDATE",
      bId: Number(blogId.get("edit")),
      ...editBlogData,
    }).then((e) => {
      if (e.data.status == 200) {
        setPopup({ save: true });
      }
    });
  };

  const addFieldHandler = () => {
    if (
      editBlogData.meta_description === null ||
      editBlogData.meta_keywords === null ||
      editBlogData.meta_title === null ||
      editBlogData.post_img === null ||
      editBlogData.post_name === null ||
      editBlogData.post_description === null
    ) {
      setIsValid(true);
      document.getElementById("isudsdui").style.border = "1px solid red";
    } else {
      setIsValid(false);
      BLOGDETAILSERVICE({
        method: "INSERT",
        ...editBlogData,
      }).then((e) => {
        if (e.data.status == 200) {
          Navigate(BLOG);
        }
      });
    }
  };

  const deleteHandler = () => {
    BLOGDETAILSERVICE({
      method: "DELETE",
      bId: Number(blogId.get("edit")),
    }).then((e) => {
      if (e.data.status == 200) {
        Navigate(BLOG);
      }
    });
  };

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
              <BlogEditiorPanel
                blogData={editBlogData}
                editData={setEditBlogData}
                valid={isValid}
              />
            </Grid>

            <Grid item mt={5} xl={12} lg={12} md={12} sm={12} xs={12}>
              <BlogCkEditor
                blogData={editBlogData}
                editData={setEditBlogData}
              />
            </Grid>
          </Grid>

          <Stack spacing={2} mt={2} direction={"row"} justifyContent="flex-end">
            <Button
              variant="contained"
              size="large"
              onClick={
                blogId.get("edit")
                  ? () => updateHandler()
                  : () => addFieldHandler()
              }
            >
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
              <Button
                onClick={() => deleteHandler()}
                variant="contained"
                color="error"
                size="large"
              >
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
