import { Button, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import PostListHorizontal from "../../../sections/@content-management/$blogs/post-list-horizontal";

import Iconify from "../../../../components/iconify/Iconify";
import { Link, NavLink } from "react-router-dom";
import { BLOGEDIT } from "../../../../constants/route-path";
import { PostDatatHandler } from "../../../../services/apiServices/apiService";

import { CustomSnackbar } from "../../../../components/custom-snackBar/customSnackbar";
import useSnackbar from "../../../../components/custom-snackBar/use-snackbar";

export default function Index() {
  const snackbar = useSnackbar();

  const type = new URLSearchParams(window.location.search).get("r");

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (type) {
      snackbar.onOpen();

      setTimeout(() => {
        const urlWithoutSearchParams =
          window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, urlWithoutSearchParams);
      }, 7000);
    }

    PostDatatHandler()
      .then((e) => {
        setData(e.data.data);
        setLoading(false);
      })
      .catch(() => alert("something went wrong"));
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
          Post
        </Typography>

        <Button
          to={BLOGEDIT}
          LinkComponent={Link}
          startIcon={<Iconify icon="material-symbols:add" />}
          variant="contained"
          color="inherit"
        >
          Add Post
        </Button>
      </Stack>

      <PostListHorizontal loading={loading} data={data} />

      <CustomSnackbar
        open={snackbar.open}
        onClose={snackbar.onClose}
        message={
          type === "update"
            ? "Post updated successfully"
            : "Post uploaded successfully"
        }
      />
    </Container>
  );
}
