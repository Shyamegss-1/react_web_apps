// @mui
import Box from "@mui/material/Box";
// types

import { PostItemSkeleton } from "./post-skeleton";
import PostCard from "./blogCard";
import { useEffect, useState } from "react";

// ----------------------------------------------------------------------
const getRandomImageUrl = () => {
  const randomString = Math.random().toString(36).substring(7);
  return `https://source.unsplash.com/random/500x500/?poloshirt&${randomString}.webp`;
};

export default function PostListHorizontal({ loading, data }) {
  const renderSkeleton = (
    <>
      {[...Array(10)].map((_, index) => (
        <PostItemSkeleton key={index} variant="horizontal" />
      ))}
    </>
  );

  const renderList = (
    <>
      {data?.map((list, index) => (
        <PostCard key={index} post={list} />
      ))}
    </>
  );

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
        }}
      >
        {loading ? renderSkeleton : renderList}
      </Box>
    </>
  );
}
