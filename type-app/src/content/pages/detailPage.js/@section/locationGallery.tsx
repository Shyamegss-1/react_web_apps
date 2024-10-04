import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid";

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function LocationGallery() {
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: "10px",
        overflow: "hidden",
        "&::before": {
          background: "black",
          content: "''",
          width: "100%",
          position: "absolute",
          top: "0px",
          left: "0px",
          height: "100%",
          zIndex: 11,
          opacity: 0,
          transition: "opacity .2s ease-in-out",
        },
        "&:hover .MuiButton-root": {
          opacity: "1",
        },
        "&:hover::before ": {
          display: "block",
          opacity: "0.5",
        },
      }}
    >
      <ImageList
        sx={{ width: 1152 }}
        variant="quilted"
        cols={4}
        rowHeight={250}
      >
        {itemData.map((item) => (
          <ImageListItem
            key={item.img}
            cols={item.cols || 1}
            rows={item.rows || 1}
          >
            <img
              {...srcset(item.img, 121, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Button
        variant="outlined"
        sx={{
          position: "absolute",
          right: "10px",
          bottom: "10px",
          zIndex: 111,
          borderColor: "gray",
          backgroundColor: "#80808066",
          color: "white",
          opacity: 0,
          "&:hover": {
            borderColor: "gray",
            backgroundColor: "gray",
            color: "white",
          },
        }}
      >
        View all photos
      </Button>
    </Box>
  );
}

const itemData = [
  {
    img: "https://source.unsplash.com/random/500x500/?nature",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://source.unsplash.com/random/500x500/?nature",
    title: "Burger",
  },
  {
    img: "https://source.unsplash.com/random/500x500/?nature",
    title: "Camera",
  },
  {
    img: "https://source.unsplash.com/random/500x500/?nature",
    title: "Coffee",
    cols: 2,
  },
];
