import { useEffect, useState } from "react";
// @mui
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// components
import Markdown from "../../../../../components/markdown/markdown";

//

import PostDetailsHero from "./post-details-hero";
import { PostDetailsSkeleton } from "./post-skeleton";
import PostDetailsToolbar from "./post-details-toolbar";
import { PostDatatHandler } from "../../../../../services/apiServices/apiService";
import { STATIC_DATA } from "../../../../../constants/path-constant";

// ----------------------------------------------------------------------

export default function PostDetailsView() {
  const renderSkeleton = <PostDetailsSkeleton />;

  const postid = new URLSearchParams(window.location.search).get("c");

  const [data, setData] = useState({});

  useEffect(() => {
    PostDatatHandler()
      .then((e) => {
        let y = e.data.data;
        let c = y.filter((e) => e.id === Number(postid));

        setData(c[0]);
      })
      .catch((err) => alert("something went wrong", err));
  }, []);

  const renderPost = true && (
    <>
      <PostDetailsToolbar backLink={"/"} editLink={"/"} liveLink={"/"} />

      <PostDetailsHero
        title={data?.post_title}
        coverUrl={STATIC_DATA + data?.image}
      />

      <Stack
        sx={{
          maxWidth: 720,
          mx: "auto",
          mt: { xs: 5, md: 10 },
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 5 }}>
          {data?.post_description}
        </Typography>

        <Markdown children={data?.post_content} />

        <Stack
          spacing={3}
          sx={{
            py: 3,
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <Stack direction="row" flexWrap="wrap" spacing={1}>
            {data?.tags?.split(",").map((_, tag) => (
              <Chip key={tag} label={_} variant="soft" />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </>
  );

  return (
    <Container maxWidth={false}>
      {!data.hasOwnProperty("image") && renderSkeleton}

      {data.hasOwnProperty("image") && renderPost}
    </Container>
  );
}
